import { put as putDispatch, select as selectSaga, call, all as allSaga, takeEvery, spawn, take, actionChannel, fork } from 'typed-redux-saga';
import { compact, isEqual } from 'lodash-es';
import type { BroadcastChannel } from 'broadcast-channel';
import { multicastChannel } from 'redux-saga'

import { wrapSagaWithErrorHandler } from '../error/sagas/wrapSagaWithErrorHandler.js';
import { T_Encoded_Base } from './model.js';
import { createCRUDActions } from './createCRUDActions.js';
import { createCRUDDB } from './createCRUDDB.js';
import { createCRUDSelectors } from './createCRUDSelectors.js';
import { createCRUDValidators } from './createCRUDValidators.js';
import { buffers, EventChannel, eventChannel } from 'redux-saga';
import { IndexableType } from 'dexie';
import { actionChannelPut, channelBuffer, channelMap, channelMapPut } from '../sagas/channel.js';

/**
 *
 * Creates common CRUD actions for a Redux/Dexie model including relevant action creators & sagas.
 * Automatically infers types.
 *
 * @param name
 * @param validators Validators used to sanitize data
 * @returns
 */
export function createCRUDSagas<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends (T_ID & T_Encoded_Base) = T_ID & T_Encoded_Base,
    T extends T_Encoded = T_Encoded,
    T_Idx = T_ID,
>(
    crudValidators: ReturnType<typeof createCRUDValidators<T_ID, T_Encoded, T>>,
    crudActions: ReturnType<typeof createCRUDActions<U, T_ID, T_Encoded, T, T_Idx>>,
    crudSelectors: ReturnType<typeof createCRUDSelectors<U, T_ID, T_Encoded, T>>,
    crudDB: ReturnType<typeof createCRUDDB<U, T_ID, T_Encoded, T, T_Idx>>,
    channel?: BroadcastChannel
) {

    const { encode, toPrimaryKey } = crudValidators;
    const { actions, actionTypes } = crudActions
    const {
        selectByIdSingle
    } = crudSelectors
    const {
        table,
        get,
        bulkGet,
        all,
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
    } = crudDB;

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

    enum DexieHookType {
        creating = 'creating',
        updating = 'updating',
        deleting = 'deleting'
    }

    interface DexieHookChannelMessage {
        type: DexieHookType
        primKey: IndexableType;
        obj: T_Encoded,
        mods?: Partial<T_Encoded>
        //updatedObj?: T_Encoded
    }


    function dexieHookChannel(t: ReturnType<typeof table>): EventChannel<DexieHookChannelMessage> {
        return eventChannel((emitter) => {
            t.hook('creating', function (primKey, obj, trans) {
                trans.on('complete', function () { emitter({ type: DexieHookType.creating, primKey, obj }) });
                //this.onsuccess = (primKey) => emitter({ type: DexieHookType.creating, primKey, obj })
            })
            t.hook('updating', function (mods, primKey, obj, trans) {
                const modKeys = Object.keys(mods)
                if (!(modKeys.length <= 1 && modKeys[0] === 'updatedAt')) {
                    trans.on('complete', function () { emitter({ type: DexieHookType.updating, primKey, obj, mods: mods as Partial<T_Encoded> }) });
                }
                //this.onsuccess = (updatedObj) => emitter({ type: DexieHookType.updating, primKey, obj, mods: mods as Partial<T_Encoded>, updatedObj })
            })
            t.hook('deleting', function (primKey, obj, trans) {
                trans.on('complete', function () { emitter({ type: DexieHookType.deleting, primKey, obj }) });
                //this.onsuccess = () => emitter({ type: DexieHookType.deleting, primKey, obj })
            })

            // The subscriber must return an unsubscribe function
            return () => {
                t.hook('creating').unsubscribe(() => { });
                t.hook('updating').unsubscribe(() => { });
                t.hook('deleting').unsubscribe(() => { });
            };
            //TODO: Buffered channel?
        }, buffers.expanding(10));
    }

    const watchChangesSaga = function* () {
        //https://dexie.org/docs/Table/Table.hook('creating')
        const t = table()
        const channel = dexieHookChannel(t)
        while (true) {
            const message = yield* take(channel)
            if (message.type === DexieHookType.creating) {
                yield* putDispatch(actions.dbCreating({
                    primKey: message.primKey,
                    obj: message.obj
                }))
            } else if (message.type === DexieHookType.updating) {
                yield* putDispatch(actions.dbUpdating({
                    primKey: message.primKey,
                    obj: message.obj,
                    mods: message.mods!,
                    //updatedObj: message.updatedObj!
                }))
            } else if (message.type === DexieHookType.deleting) {
                yield* putDispatch(actions.dbDeleting({
                    primKey: message.primKey,
                    obj: message.obj
                }))
            }
        }
    }
    /** Dexie Sagas */
    const watchCreateSaga = function* () {
        const chan = yield* actionChannel<CreateAction>(actionTypes.CREATE);
        const chanBuff = yield* call(channelBuffer<CreateAction>, chan, 1000, 100)
        const chanBatched = yield* call(channelMap<CreateAction[], CreateBatchedAction>, chanBuff, (e: CreateAction[]) => {
            return actions.createBatched(e.map((a) => a.payload))
        })
        yield* fork(actionChannelPut, chanBatched)
    }
    const watchPutSaga = function* () {
        const chan = yield* actionChannel<PutAction>(actionTypes.PUT);
        const chanBuff = yield* call(channelBuffer<PutAction>, chan, 1000, 100)
        const chanBatched = yield* call(channelMap<PutAction[], PutBatchedAction>, chanBuff, (e: PutAction[]) => {
            return actions.putBatched(e.map((a) => a.payload))
        })
        yield* fork(actionChannelPut, chanBatched)
    }
    const watchUpdateSaga = function* () {
        const chan = yield* actionChannel<UpdateAction>(actionTypes.UPDATE);
        const chanBuff = yield* call(channelBuffer<UpdateAction>, chan, 1000, 100)
        const chanBatched = yield* call(channelMap<UpdateAction[], UpdateBatchedAction>, chanBuff, (e: UpdateAction[]) => {
            return actions.updateBatched(e.map((a) => a.payload))
        })
        yield* fork(actionChannelPut, chanBatched)
    }
    const watchUpsertSaga = function* () {
        const chan = yield* actionChannel<UpsertAction>(actionTypes.UPSERT);
        const chanBuff = yield* call(channelBuffer<UpsertAction>, chan, 1000, 100)
        const chanBatched = yield* call(channelMap<UpsertAction[], UpsertBatchedAction>, chanBuff, (e: UpsertAction[]) => {
            return actions.upsertBatched(e.map((a) => a.payload))
        })
        yield* fork(actionChannelPut, chanBatched)
    }
    const watchDeleteSaga = function* () {
        const chan = yield* actionChannel<DeleteAction>(actionTypes.UPSERT);
        const chanBuff = yield* call(channelBuffer<DeleteAction>, chan, 1000, 100)
        const chanBatched = yield* call(channelMap<DeleteAction[], DeleteBatchedAction>, chanBuff, (e: DeleteAction[]) => {
            return actions.deleteBatched(e.map((a) => a.payload))
        })
        yield* fork(actionChannelPut, chanBatched)
    }

    /*
    const createMulticast = function* () {
        const createChannel = yield* actionChannel<CreateAction>(actionTypes.CREATE)
        const createMulticastChannel = multicastChannel<CreateAction>()
        yield* fork(channelMapPut, createChannel, (e: CreateAction) => e, createMulticastChannel)
        return createMulticastChannel
    }
    */
    const createBatchedSaga = function* (action: CreateBatchedAction) {
        yield* call(bulkAdd, action.payload);
    };
    const putBatchedSaga = function* (action: PutBatchedAction) {
        yield* call(bulkPut, action.payload);
    };
    const updateBatchedSaga = function* (action: UpdateBatchedAction) {
        yield* call(bulkUpdate, action.payload);
    };
    const upsertBatchedSaga = function* (action: UpsertBatchedAction) {
        yield* call(bulkUpsert, action.payload);
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
            spawn(watchChangesSaga),
            spawn(watchCreateSaga),
            spawn(watchPutSaga),
            spawn(watchUpdateSaga),
            spawn(watchUpsertSaga),
            spawn(watchDeleteSaga),
            //takeEvery(actionTypes.CREATE, wrapSagaWithErrorHandler(createSaga, actionTypes.CREATE)),
            takeEvery(
                actionTypes.CREATE_BATCHED,
                wrapSagaWithErrorHandler(createBatchedSaga, actionTypes.CREATE_BATCHED),
            ),
            takeEvery(actionTypes.PUT_BATCHED, wrapSagaWithErrorHandler(putBatchedSaga, actionTypes.PUT_BATCHED)),
            takeEvery(
                actionTypes.UPDATE_BATCHED,
                wrapSagaWithErrorHandler(updateBatchedSaga, actionTypes.UPDATE_BATCHED),
            ),
            takeEvery(
                actionTypes.UPSERT_BATCHED,
                wrapSagaWithErrorHandler(upsertBatchedSaga, actionTypes.UPSERT_BATCHED),
            ),
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
        createBatched: createBatchedSaga,
        putBatched: putBatchedSaga,
        updateBatched: updateBatchedSaga,
        upsertBatched: upsertBatchedSaga,
        deleteBatched: deleteBatchedSaga,
        hydrate: hydrateSaga,
        hydrateBatched: hydrateBatchedSaga,
        hydrateAll: hydrateAllSaga,
        crudRootSaga,
    };

    return sagas
}
