import { useEffect, useMemo } from 'react';
import { put as putDispatch, select as selectSaga, call, all as allSaga, takeEvery } from 'typed-redux-saga';
import { useLiveQuery } from 'dexie-react-hooks';
import { createSelector } from 'redux-orm';
import { useDispatch, useSelector } from 'react-redux';
import { IndexableType, IndexableTypeArrayReadonly } from 'dexie';
import type { Action } from '@reduxjs/toolkit';
import { compact, filter, zip, isEqual, omitBy, isUndefined } from 'lodash-es';
import Dexie from 'dexie';

import { createCRUDActions } from './createCRUDActions.js';
import { toReduxOrmId, isDefinedRecord, isDefined } from '../utils/index.js';
import { wrapSagaWithErrorHandler } from '../error/sagas/wrapSagaWithErrorHandler.js';
import { T_Encoded_Base } from './model.js';

/**
 *
 * Creates common CRUD actions for a Redux/Dexie model including relevant action creators & sagas.
 * Automatically infers types.
 *
 * @param name
 * @param validators Validators used to sanitize data
 *      @param validateId Validate id to Dexie-supported format. Defaults to calling object values.
 *      @param validate Validate item that will be inserted computing any default values. Defaults to identity function.
 *      @param hydrate Instantiate objects that are not encoded in Dexie.
 *      @param encode Encode an hydrated object to be inserted stripping out objects.
 * @returns
 */
export function createCRUDModel<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends (T_ID & T_Encoded_Base) = T_ID & T_Encoded_Base,
    T extends T_Encoded = T_Encoded,
    T_Idx = T_ID,
    DB extends Dexie = Dexie,
>(
    name: U,
    getDB: () => DB,
    validators?: {
        validateId?: (id: T_ID) => T_ID;
        validate?: (item: T) => T;
        hydrate?: (item: T, sess?: any) => T;
        encode?: (item: T) => T_Encoded;
        toPrimaryKey?: (id: T_ID) => IndexableType;
    },
    orm?: any
) {
    const validateId = validators?.validateId ?? ((id: T_ID) => omitBy(id, isUndefined) as T_ID);
    const validate = validators?.validate ?? ((item: T) => omitBy(item, isUndefined) as T);
    const hydrate = validators?.hydrate ?? ((item: T) => omitBy(item, isUndefined) as T);
    const encode = validators?.encode ?? ((item: T) => omitBy(item, isUndefined) as T_Encoded);
    const toPrimaryKey =
        validators?.toPrimaryKey ??
        ((id: T_ID) => {
            const values = Object.values(id) as IndexableTypeArrayReadonly;
            if (values.length == 1) return values[0];
            return values;
        });

    const toPrimaryKeyString = (id: T_ID | string): string =>
        typeof id === 'string' ? id : toReduxOrmId(toPrimaryKey(id));

    const { actions, actionTypes, isAction } = createCRUDActions<U, T_ID, T_Encoded, T, T_Idx>(name, {
        validateId,
        validate,
    });

    type CreateAction = ReturnType<typeof actions.create>;
    type CreateBatchedAction = ReturnType<typeof actions.createBatched>;
    type PutAction = ReturnType<typeof actions.put>;
    type PutBatchedAction = ReturnType<typeof actions.putBatched>;
    type UpdateAction = ReturnType<typeof actions.update>;
    type UpdateBatchedAction = ReturnType<typeof actions.updateBatched>;
    type UpsertAction = ReturnType<typeof actions.upsert>;
    type UpsertBatchedAction = ReturnType<typeof actions.upsertBatched>;
    type DeleteAction = ReturnType<typeof actions.delete>;
    type DeleteBatchedAction = ReturnType<typeof actions.deleteBatched>;
    type HydrateAction = ReturnType<typeof actions.hydrate>;
    type HydrateBatchedAction = ReturnType<typeof actions.hydrateBatched>;
    type HydrateAllAction = ReturnType<typeof actions.hydrateAll>;

    /** Redux ORM Reducer */
    const reducer = (sess: any, action: Action) => {
        const Model = sess[name];
        if (actions.create.match(action)) {
            Model.create(hydrate(action.payload, sess));
        } else if (actions.createBatched.match(action)) {
            action.payload.forEach((p) => Model.create(hydrate(p, sess)));
        } else if (actions.put.match(action)) {
            Model.withId(toPrimaryKeyString(action.payload))?.delete();
            Model.create(hydrate(action.payload, sess));
        } else if (actions.putBatched.match(action)) {
            action.payload.forEach((p) => {
                Model.withId(toPrimaryKeyString(p))?.delete();
                Model.create(hydrate(p, sess));
            });
        } else if (actions.update.match(action)) {
            Model.update(hydrate(action.payload, sess));
        } else if (actions.updateBatched.match(action)) {
            action.payload.forEach((p) => Model.update(hydrate(p, sess)));
        } else if (actions.upsert.match(action)) {
            Model.upsert(hydrate(action.payload, sess));
        } else if (actions.upsertBatched.match(action)) {
            action.payload.forEach((p) => Model.upsert(hydrate(p, sess)));
        } else if (actions.delete.match(action)) {
            Model.withId(toPrimaryKeyString(action.payload))?.delete();
        } else if (actions.deleteBatched.match(action)) {
            action.payload.forEach((p) => Model.withId(toPrimaryKeyString(p))?.delete());
        }
        return sess;
    };

    /** Redux ORM Selectors */
    //Only create selectors if orm model defined
    const ormModel = orm ? orm[name] : undefined;
    const select = ormModel ? createSelector(ormModel) : () => undefined;
    const selectByIdSingle = (state: any, id: Partial<T_ID> | string | undefined): T | undefined => {
        if (!id) return undefined;
        if (typeof id != 'string' && !isDefinedRecord(id)) return undefined;
        return select(state, toPrimaryKeyString(id));
    };

    const selectByIdMany = (state: any, ids?: T_ID[] | string[]): (T | null)[] => {
        if (!ids) return select(state); //Return all
        return select(state, ids.map(toPrimaryKeyString));
    };

    const selectAll = (state: any): T[] => {
        return select(state);
    };

    const selectWhere = (state: any, f: Partial<T_Encoded>) => {
        const all = selectByIdMany(state);
        return filter(all, f) as T_Encoded[];
    };

    const selectors = {
        select,
        selectByIdSingle,
        selectByIdMany,
        selectWhere,
        selectAll,
    };

    /** Dexie Getters */
    const get = (idx: T_Idx | string) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        //@ts-expect-error
        return table.get(idx);
    };

    const bulkGet = (ids: T_ID[] | string[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkGet(ids.map((id) => (typeof id === 'string' ? id : toPrimaryKey(id))));
    };

    const all = () => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.toArray();
    };

    const where = (filter: T_Idx, options?: { reverse?: boolean; offset?: number; limit?: number }) => {
        const reverse = options?.reverse;
        const offset = options?.offset;
        const limit = options?.limit;

        const db = getDB();
        const table = db.table<T_Encoded>(name);
        //@ts-expect-error
        let result = table.where(filter);
        //@ts-expect-error
        if (reverse) result = result.reverse();
        //@ts-expect-error
        if (offset) result = result.offset(offset);
        //@ts-expect-error
        if (limit) result = result.limit(limit);

        return result.toArray();
    };

    const add = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.add({ ...encode(item), updatedAt: Date.now() });
    };

    const bulkAdd = (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkAdd(items.map(encode).map((item) => { return { ...item, updatedAt: Date.now() } }));
    };

    const put = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.put({ ...encode(item), updatedAt: Date.now() });
    };

    const bulkPut = (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkPut(items.map(encode).map((item) => { return { ...item, updatedAt: Date.now() } }));
    };

    const update = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        const encoded = encode({ ...item, updatedAt: Date.now() });
        return table.update(encoded, encoded);
    };

    const bulkUpdate = (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        return db.transaction('rw', table, () => {
            const promises = items.map((t) => {
                const encoded = encode({ ...t, updatedAt: Date.now() });
                table.update(encoded, encoded);
            });
            return Promise.all(promises);
        });
    };

    const upsert = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        const id = toPrimaryKey(item);
        const encoded = encode({ ...item, updatedAt: Date.now() });

        return db.transaction('rw', table, () => {
            return table.get(id).then((existing) => {
                if (!existing) return table.add(encoded);
                else return table.update(id, encoded);
            });
        });
    };

    const bulkUpsert = async (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        const ids = items.map(toPrimaryKey);
        const encoded = items.map(encode).map((item) => { return { ...item, updatedAt: Date.now() } });

        return db.transaction('rw', table, () => {
            return table.bulkGet(ids).then((results) => {
                const joined = zip(encoded, ids, results) as [
                    T_Encoded,
                    IndexableTypeArrayReadonly,
                    T_Encoded | undefined,
                ][];
                const promises = joined.map(([data, id, result]) => {
                    if (!result) return table.add(data!);
                    else return table.update(id, data);
                });
                return Promise.all(promises);
            });
        });
    };

    const deleteDB = (id: T_ID) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.delete(Object.values(id));
    };

    const bulkDelete = (ids: T_ID[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkDelete(ids.map(Object.values));
    };

    const clear = () => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.clear();
    };

    const db = {
        get,
        bulkGet,
        all,
        where,
        add,
        bulkAdd,
        put,
        bulkPut,
        update,
        bulkUpdate,
        upsert,
        bulkUpsert,
        delete: deleteDB,
        bulkDelete,
        clear,
    };

    /** Dexie Sagas */
    const createSaga = function* (action: CreateAction) {
        yield* call(add, action.payload);
    };
    const createBatchedSaga = function* (action: CreateBatchedAction) {
        yield* call(bulkAdd, action.payload);
    };
    const putSaga = function* (action: PutAction) {
        yield* call(put, action.payload);
    };
    const putBatchedSaga = function* (action: PutBatchedAction) {
        yield* call(bulkPut, action.payload);
    };
    const updateSaga = function* (action: UpdateAction) {
        yield* call(update, action.payload);
    };
    const updateBatchedSaga = function* (action: UpdateBatchedAction) {
        yield* call(bulkUpdate, action.payload);
    };
    const upsertSaga = function* (action: UpsertAction) {
        yield* call(upsert, action.payload);
    };
    const upsertBatchedSaga = function* (action: UpsertBatchedAction) {
        yield* call(bulkUpsert, action.payload);
    };
    const deleteSaga = function* (action: DeleteAction) {
        yield* call(deleteDB, action.payload);
    };
    const deleteBatchedSaga = function* (action: DeleteBatchedAction) {
        yield* call(bulkDelete, action.payload);
    };
    const hydrateSaga = function* (action: HydrateAction) {
        const { payload } = action;
        const { id, defaultItem } = payload;

        const itemDB = yield* call(get, id);
        if (itemDB) {
            const itemRedux = yield* selectSaga(selectByIdSingle, itemDB);
            if (!itemRedux) {
                //Update redux by dispatching an update
                yield* putDispatch(actions.upsert(itemDB as T, action.meta.uuid));
            } else if (!isEqual(encode(itemRedux), itemDB)) {
                //Update redux by dispatching an update
                yield* putDispatch(actions.upsert(itemDB as T, action.meta.uuid));
            }
        } else if (defaultItem) {
            yield* putDispatch(actions.upsert(defaultItem as T));
        }
    };
    const hydrateBatchedSaga = function* (action: HydrateBatchedAction) {
        const items = yield* call(bulkGet, action.payload);
        if (items) yield* putDispatch(actions.upsertBatched(compact(items) as T[], action.meta.uuid)); //Update redux by dispatching an update
    };
    const hydrateAllSaga = function* (action: HydrateAllAction) {
        const items = yield* call(all);
        if (items) yield* putDispatch(actions.updateBatched(compact(items) as T[], action.meta.uuid)); //Update redux by dispatching an update
    };

    const crudRootSaga = function* () {
        yield* allSaga([
            takeEvery(actionTypes.CREATE, wrapSagaWithErrorHandler(createSaga, actionTypes.CREATE)),
            takeEvery(
                actionTypes.CREATE_BATCHED,
                wrapSagaWithErrorHandler(createBatchedSaga, actionTypes.CREATE_BATCHED),
            ),
            takeEvery(actionTypes.PUT, wrapSagaWithErrorHandler(putSaga, actionTypes.PUT)),
            takeEvery(actionTypes.PUT_BATCHED, wrapSagaWithErrorHandler(putBatchedSaga, actionTypes.PUT_BATCHED)),
            takeEvery(actionTypes.UPDATE, wrapSagaWithErrorHandler(updateSaga, actionTypes.UPDATE)),
            takeEvery(
                actionTypes.UPDATE_BATCHED,
                wrapSagaWithErrorHandler(updateBatchedSaga, actionTypes.UPDATE_BATCHED),
            ),
            takeEvery(actionTypes.UPSERT, wrapSagaWithErrorHandler(upsertSaga, actionTypes.UPSERT)),
            takeEvery(
                actionTypes.UPSERT_BATCHED,
                wrapSagaWithErrorHandler(upsertBatchedSaga, actionTypes.UPSERT_BATCHED),
            ),
            takeEvery(actionTypes.DELETE, wrapSagaWithErrorHandler(deleteSaga, actionTypes.DELETE)),
            takeEvery(
                actionTypes.DELETE_BATCHED,
                wrapSagaWithErrorHandler(deleteBatchedSaga, actionTypes.DELETE_BATCHED),
            ),
            takeEvery(actionTypes.HYDRATE, wrapSagaWithErrorHandler(hydrateSaga, actionTypes.HYDRATE)),
            takeEvery(
                actionTypes.HYDRATE_BATCHED,
                wrapSagaWithErrorHandler(hydrateBatchedSaga, actionTypes.HYDRATE_BATCHED),
            ),
            takeEvery(actionTypes.HYDRATE_ALL, wrapSagaWithErrorHandler(hydrateAllSaga, actionTypes.HYDRATE_ALL)),
        ]);
    };

    const sagas = {
        create: createSaga,
        createBatched: createBatchedSaga,
        put: putSaga,
        putBatched: putBatchedSaga,
        update: updateSaga,
        updateBatched: updateBatchedSaga,
        upsert: upsertSaga,
        upsertBatched: upsertBatchedSaga,
        delete: deleteSaga,
        deleteBatched: deleteBatchedSaga,
        hydrate: hydrateSaga,
        hydrateBatched: hydrateBatchedSaga,
        hydrateAll: hydrateAllSaga,
        crudRootSaga,
    };

    /** Dexie Hooks */
    const useGet = (idx: Partial<T_Idx> | string | undefined) => {
        const defined = isDefined(idx);
        const dep = defined ? JSON.stringify(idx) : undefined;

        //@ts-expect-error
        const response = useLiveQuery(() => (defined ? get(idx) : undefined), [dep], 'loading' as const);
        const isLoading = response === 'loading';
        const result = isLoading ? undefined : response;
        const exists = !!result; //false while loading
        const returnOptions = { isLoading, exists };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };
    //TODO: string array id
    const useGetBulk = (ids: Partial<T_ID>[] | string[] | undefined) => {
        const response = useLiveQuery(
            () => {
                if (ids) {
                    const ids2 = (ids as (Partial<T_ID> | string)[]).filter((id) => {
                        return isDefined(id);
                    }) as T_ID[] | string[];
                    return bulkGet(ids2);
                }
                return [];
            },
            [JSON.stringify(ids)],
            'loading' as const,
        );
        const isLoading = response === 'loading';
        const result = isLoading ? undefined : response;
        const exists = !!result; //false while loading
        const returnOptions = { isLoading, exists };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };

    const useAll = () => {
        const response = useLiveQuery(all, [], 'loading');
        const isLoading = response === 'loading';
        const result = isLoading ? undefined : response;
        const exists = !!result; //false while loading
        const returnOptions = { isLoading, exists };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };

    const useWhere = (
        filter: Partial<T_Idx> | undefined,
        options?: { reverse?: boolean; offset?: number; limit?: number },
    ) => {
        const reverse = options?.reverse;
        const offset = options?.offset;
        const limit = options?.limit;

        const filterDep = JSON.stringify(filter);
        const response = useLiveQuery(
            //@ts-expect-error
            () => (filter && isDefinedRecord(filter) ? where(filter, { reverse, offset, limit }) : []),
            [filterDep, limit, offset],
            'loading' as const,
        );

        const isLoading = response === 'loading';
        const result = isLoading ? undefined : response;
        const exists = !!result; //false while loading
        const returnOptions = { isLoading, exists };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };

    /** Redux ORM Hooks */
    const useSelectByIdSingle = (id: Partial<T_ID> | string | undefined) => {
        return useSelector((state) => selectByIdSingle(state, id));
    };
    const useSelectByIdMany = (id?: T_ID[] | string[]) => {
        return useSelector((state) => selectByIdMany(state, id));
    };
    const useFetch = (
        idx: Partial<T_Idx> | undefined,
        defaultItem: Partial<T> | undefined = undefined,
        maxCacheAge: number = 0,
        loadRedux: boolean = false) => {
        const dispatch = useDispatch();

        //DB Item
        const [itemDB, { exists: dbExists, isLoading }] = useGet(idx)
        const refreshDB = !itemDB?.updatedAt || Date.now() - itemDB.updatedAt > maxCacheAge
        //console.debug({ idx, dbExists, reduxExists })
        useEffect(() => {
            //Fetch DB Item
            if (idx && isDefinedRecord(idx) && !isLoading && refreshDB) {
                dispatch(actions.fetch({ ...defaultItem, ...(idx as T_ID), maxCacheAge }));
            }
        }, [JSON.stringify(idx), defaultItem, maxCacheAge, dispatch, refreshDB, isLoading])

        //Redux Item
        //Load redux with id from db item
        const id = useMemo(() => {
            if (!loadRedux) return undefined;
            if (itemDB) return itemDB ? validateId(itemDB) : undefined;
        }, [idx, loadRedux, itemDB]);
        const itemRedux = useSelectByIdSingle(id);
        const reduxExists = !!itemRedux;
        const refreshRedux = !itemRedux?.updatedAt || Date.now() - itemRedux.updatedAt > maxCacheAge
        useEffect(() => {
            //Fetch Redux item
            //console.debug({ id, refreshRedux })
            if (loadRedux && id && isDefinedRecord(id) && refreshRedux) {
                dispatch(actions.fetch({ ...defaultItem, ...id, maxCacheAge }));
            }
        }, [defaultItem, maxCacheAge, loadRedux, dispatch, JSON.stringify(id), refreshRedux]);

        const item = (itemRedux ?? itemDB) as T | undefined
        const exists = dbExists || reduxExists;
        const options = { exists, dbExists, reduxExists, isLoading }
        return [item, options] as [typeof item, typeof options];
    };

    const useSelectAll = () => {
        return useSelector((state) => selectAll(state));
    };
    const useSelectWhere = (f: Partial<T>) => {
        return useSelector((state) => selectWhere(state, f));
    };
    const useHydrate = (idx: Partial<T_Idx> | undefined, defaultItem?: T | undefined) => {
        const dispatch = useDispatch();
        const [itemDB] = useGet(idx);
        //Use db item or assume idx is id
        const id = useMemo(() => (itemDB ? validateId(itemDB) : validateId(idx as T_ID)), [idx, itemDB]);
        const itemRedux = useSelectByIdSingle(id);
        const itemReduxExists = !!itemRedux;

        //Reset state
        const idxHash = JSON.stringify(idx);
        const defaultItemHash = JSON.stringify(defaultItem);
        const action = useMemo(() => {
            if (idx && isDefinedRecord(idx)) {
                //@ts-expect-error
                return actions.hydrate({ id: idx, defaultItem });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [idxHash, defaultItemHash]);

        useEffect(() => {
            if (action && !itemReduxExists) {
                dispatch(action);
            }
        }, [dispatch, action, itemReduxExists]);

        const returnValue = itemRedux;
        const exists = itemReduxExists;
        const returnOptions = { exists };

        return [returnValue, returnOptions] as [typeof returnValue, typeof returnOptions];
    };

    const hooks = {
        useFetch,
        useGet,
        useGetBulk,
        useAll,
        useWhere,
        useSelectByIdSingle,
        useSelectByIdMany,
        useSelectAll,
        useSelectWhere,
        useHydrate,
    };

    return {
        name,
        actions,
        actionTypes,
        db,
        hooks,
        sagas,
        selectors,
        isAction,
        reducer,
        validate,
        validateId,
        hydrate,
        encode,
        toPrimaryKey,
        toPrimaryKeyString,
    };
}
