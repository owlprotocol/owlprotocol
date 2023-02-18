import { useEffect, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { zip } from 'lodash-es';

import { createCRUDActions } from './createCRUDActions.js';
import { isDefinedRecord, isDefined } from '../utils/index.js';
import { T_Encoded_Base } from './model.js';
import { createCRUDDB } from './createCRUDDB.js';
import { createCRUDSelectors } from './createCRUDSelectors.js';
import { createCRUDValidators } from './createCRUDValidators.js';

//Create CRUD Hooks.
//GOAL: Decouple crud-redux from react
/**
 *
 * Creates common CRUD actions for a Redux/Dexie model including relevant action creators & sagas.
 * Automatically infers types.
 *
 * @param name
 * @param validators Validators used to sanitize data
 * @param crudActions
 * @param crudSelectors
 * @param crudDB
 * @returns
 */
export function createCRUDHooks<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends (T_ID & T_Encoded_Base) = T_ID & T_Encoded_Base,
    T extends T_Encoded = T_Encoded,
    T_Idx = T_ID,
>(
    crudValidators: ReturnType<typeof createCRUDValidators<T_ID, T_Encoded, T>>,
    crudActions: ReturnType<typeof createCRUDActions<U, T_ID, T_Encoded, T, T_Idx>>,
    crudSelectors: ReturnType<typeof createCRUDSelectors<U, T_ID, T_Encoded, T>>,
    crudDB: ReturnType<typeof createCRUDDB<U, T_ID, T_Encoded, T, T_Idx>>
) {
    const { validateId } = crudValidators;
    const { actions, actionTypes } = crudActions
    const {
        selectByIdSingle,
        selectByIdMany,
        selectAll,
        selectWhere
    } = crudSelectors
    const {
        get,
        bulkGet,
        all,
        where,
        delete: deleteDB,
    } = crudDB;

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
        const returnOptions = { isLoading };
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
        const returnOptions = { isLoading };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };

    const useWhereMany = (queries: Parameters<typeof useWhere>[]) => {
        const dep = JSON.stringify(queries);
        const response = useLiveQuery(
            async () => {
                return queries.map(([filter, options]) => {
                    const reverse = options?.reverse;
                    const offset = options?.offset;
                    const limit = options?.limit;
                    //@ts-expect-error
                    const result = filter && isDefinedRecord(filter) ? where(filter, { reverse, offset, limit }) : ([] as const)
                    return result
                })
            },
            [dep],
            'loading' as const,
        );

        const isLoading = response === 'loading';
        const result = isLoading ? undefined : response;
        const returnOptions = { isLoading };
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
                //@ts-expect-error
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
                //@ts-expect-error
                dispatch(actions.fetch({ ...defaultItem, ...id, maxCacheAge }));
            }
        }, [defaultItem, maxCacheAge, loadRedux, dispatch, JSON.stringify(id), refreshRedux]);

        const item = (itemRedux ?? itemDB) as T | undefined
        const exists = dbExists || reduxExists;
        const options = { exists, dbExists, reduxExists, isLoading }
        return [item, options] as [typeof item, typeof options];
    };

    const useFetchMany = (
        idList: T_ID[],
        defaultItemList: T[] = [],
        maxCacheAge: number = 0,
        loadRedux: boolean = false) => {
        const dispatch = useDispatch();

        //DB Item
        const [itemDBList, { isLoading }] = useGetBulk(idList)
        const refreshDBList = useMemo(() => {
            return (itemDBList ?? [])?.map((itemDB) => !itemDB?.updatedAt || Date.now() - itemDB.updatedAt > maxCacheAge)
        }, [itemDBList])

        //console.debug({ idx, dbExists, reduxExists })
        useEffect(() => {
            idList.forEach((idx, i) => {
                const refreshDB = refreshDBList[i]
                //Fetch DB Item
                if (idx && isDefinedRecord(idx) && !isLoading && refreshDB) {
                    const defaultItem = defaultItemList[i] ?? {}
                    dispatch(actions.fetch({ ...defaultItem, ...(idx as T_ID), maxCacheAge }));
                }
            })
        }, [JSON.stringify(idList), defaultItemList, maxCacheAge, dispatch, refreshDBList, isLoading])

        //Redux Item
        //Load redux with id from db item
        const itemReduxList = useSelectByIdMany(idList);
        const refreshReduxList = useMemo(() => itemReduxList.map((itemRedux) => !itemRedux?.updatedAt || Date.now() - itemRedux.updatedAt > maxCacheAge), [itemReduxList]);

        useEffect(() => {
            //Fetch Redux item
            //console.debug({ id, refreshRedux })
            idList.map((id, i) => {
                const defaultItem = defaultItemList[i]
                const refreshRedux = refreshReduxList[i]
                if (loadRedux && id && isDefinedRecord(id) && refreshRedux) {
                    dispatch(actions.fetch({ ...defaultItem, ...id, maxCacheAge }));
                }
            })
        }, [defaultItemList, maxCacheAge, loadRedux, dispatch, JSON.stringify(idList), refreshReduxList]);

        const itemList = useMemo(() => zip(itemDBList, itemReduxList).map(([itemDB, itemRedux]) => (itemRedux ?? itemDB) as T | undefined), [itemDBList, itemReduxList])
        const options = { isLoading }
        return [itemList, options] as [typeof itemList, typeof options];
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
        useFetchMany,
        useGet,
        useGetBulk,
        useAll,
        useWhere,
        useWhereMany,
        useSelectByIdSingle,
        useSelectByIdMany,
        useSelectAll,
        useSelectWhere,
        useHydrate,
    };

    return hooks
}
