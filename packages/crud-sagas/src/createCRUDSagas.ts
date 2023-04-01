/* eslint-disable @typescript-eslint/no-empty-function */
import { put as putDispatch, call, all as allSaga, takeEvery, spawn, take } from "typed-redux-saga";

import { buffers, EventChannel, eventChannel } from "redux-saga";
import { IndexableType } from "dexie";
import { createCRUDActions } from "@owlprotocol/crud-actions";
import { CRUDTable } from "@owlprotocol/crud-dexie";
import { wrapSagaWithErrorHandler } from "./wrapSagaWithErrorHandler.js";
//import { channelTakeEveryPut, channelBuffer, channelMap } from "../sagas/channel.js";

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
    T,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TKeyId,
    TKeyIdEq,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TKeyIdx,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TKeyIdxEq,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    TKeyIdxEqAny,
    TPartial = T,
    TRedux = T,
>(
    crudActions: ReturnType<typeof createCRUDActions<U, TKeyIdEq, T, TPartial, TRedux>>,
    crudDB: {
        table: CRUDTable<U, T, any, TKeyIdEq, any, any>;
        add: (items: T) => Promise<any>;
        put: (items: T) => Promise<any>;
        update: (items: T) => Promise<any>;
        upsert: (items: T) => Promise<any>;
        delete: (items: TKeyIdEq) => Promise<any>;
        bulkAdd: (items: T[]) => Promise<any>;
        bulkPut: (items: T[]) => Promise<any>;
        bulkUpdate: (items: T[]) => Promise<any>;
        bulkUpsert: (items: T[]) => Promise<any>;
        bulkDelete: (items: TKeyIdEq[]) => Promise<any>;
    },
) {
    const { actions, actionTypes } = crudActions;
    const {
        table,
        add,
        put,
        update,
        upsert,
        delete: deleteDB,
        bulkAdd,
        bulkPut,
        bulkUpdate,
        bulkUpsert,
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

    enum DexieHookType {
        creating = "creating",
        updating = "updating",
        deleting = "deleting",
    }

    interface DexieHookChannelMessage {
        type: DexieHookType;
        primKey: IndexableType;
        obj: T;
        mods?: Partial<T>;
        //updatedObj?: T_Encoded
    }

    function dexieHookChannel(t: typeof table): EventChannel<DexieHookChannelMessage> {
        return eventChannel((emitter) => {
            t.hook("creating", function (primKey, obj, trans) {
                trans.on("complete", function () {
                    emitter({ type: DexieHookType.creating, primKey, obj });
                });
                //this.onsuccess = (primKey) => emitter({ type: DexieHookType.creating, primKey, obj })
            });
            t.hook("updating", function (mods, primKey, obj, trans) {
                const modKeys = Object.keys(mods);
                if (!(modKeys.length <= 1 && modKeys[0] === "updatedAt")) {
                    trans.on("complete", function () {
                        emitter({ type: DexieHookType.updating, primKey, obj, mods: mods as Partial<T> });
                    });
                }
                //this.onsuccess = (updatedObj) => emitter({ type: DexieHookType.updating, primKey, obj, mods: mods as Partial<T_Encoded>, updatedObj })
            });
            t.hook("deleting", function (primKey, obj, trans) {
                trans.on("complete", function () {
                    emitter({ type: DexieHookType.deleting, primKey, obj });
                });
                //this.onsuccess = () => emitter({ type: DexieHookType.deleting, primKey, obj })
            });

            // The subscriber must return an unsubscribe function
            return () => {
                // eslint-disable-next-line prettier/prettier
                t.hook("creating").unsubscribe(() => { });
                // eslint-disable-next-line prettier/prettier
                t.hook("updating").unsubscribe(() => { });
                // eslint-disable-next-line prettier/prettier
                t.hook("deleting").unsubscribe(() => { });
            };
            //TODO: Buffered channel?
        }, buffers.expanding(10));
    }

    const watchChangesSaga = function* () {
        //https://dexie.org/docs/Table/Table.hook('creating')
        const channel = dexieHookChannel(table);
        while (true) {
            const message = yield* take(channel);
            if (message.type === DexieHookType.creating) {
                yield* putDispatch(
                    actions.dbCreating({
                        primKey: message.primKey,
                        obj: message.obj,
                    }),
                );
            } else if (message.type === DexieHookType.updating) {
                yield* putDispatch(
                    actions.dbUpdating({
                        primKey: message.primKey,
                        obj: message.obj,
                        mods: message.mods!,
                        //updatedObj: message.updatedObj!
                    }),
                );
            } else if (message.type === DexieHookType.deleting) {
                yield* putDispatch(
                    actions.dbDeleting({
                        primKey: message.primKey,
                        obj: message.obj,
                    }),
                );
            }
        }
    };
    /** Dexie Sagas */
    /*
    const watchCreateSaga = function* () {
        const chan = yield* actionChannel<CreateAction>(actionTypes.CREATE);
        const chanBuff = yield* call(channelBuffer<CreateAction>, chan, 1000, 100);
        const chanBatched = yield* call(
            channelMap<CreateAction[], CreateBatchedAction>,
            chanBuff,
            (e: CreateAction[]) => {
                return actions.createBatched(e.map((a) => a.payload as unknown as T_Partial));
            },
        );
        yield* fork(channelTakeEveryPut, chanBatched);
    };
    const watchPutSaga = function* () {
        const chan = yield* actionChannel<PutAction>(actionTypes.PUT);
        const chanBuff = yield* call(channelBuffer<PutAction>, chan, 1000, 100);
        const chanBatched = yield* call(channelMap<PutAction[], PutBatchedAction>, chanBuff, (e: PutAction[]) => {
            return actions.putBatched(e.map((a) => a.payload as unknown as T_Partial));
        });
        yield* fork(channelTakeEveryPut, chanBatched);
    };
    const watchUpdateSaga = function* () {
        const chan = yield* actionChannel<UpdateAction>(actionTypes.UPDATE);
        const chanBuff = yield* call(channelBuffer<UpdateAction>, chan, 1000, 100);
        const chanBatched = yield* call(
            channelMap<UpdateAction[], UpdateBatchedAction>,
            chanBuff,
            (e: UpdateAction[]) => {
                return actions.updateBatched(e.map((a) => a.payload as unknown as T_Partial));
            },
        );
        yield* fork(channelTakeEveryPut, chanBatched);
    };
    const watchUpsertSaga = function* () {
        const chan = yield* actionChannel<UpsertAction>(actionTypes.UPSERT);
        const chanBuff = yield* call(channelBuffer<UpsertAction>, chan, 1000, 100);
        const chanBatched = yield* call(
            channelMap<UpsertAction[], UpsertBatchedAction>,
            chanBuff,
            (e: UpsertAction[]) => {
                return actions.upsertBatched(e.map((a) => a.payload as unknown as T_Partial));
            },
        );
        yield* fork(channelTakeEveryPut, chanBatched);
    };
    const watchDeleteSaga = function* () {
        const chan = yield* actionChannel<DeleteAction>(actionTypes.DELETE);
        const chanBuff = yield* call(channelBuffer<DeleteAction>, chan, 1, 100);
        const chanBatched = yield* call(
            channelMap<DeleteAction[], DeleteBatchedAction>,
            chanBuff,
            (e: DeleteAction[]) => {
                return actions.deleteBatched(e.map((a) => a.payload));
            },
        );
        yield* fork(channelTakeEveryPut, chanBatched);
    };
    */

    /*
    const createMulticast = function* () {
        const createChannel = yield* actionChannel<CreateAction>(actionTypes.CREATE)
        const createMulticastChannel = multicastChannel<CreateAction>()
        yield* fork(channelMapPut, createChannel, (e: CreateAction) => e, createMulticastChannel)
        return createMulticastChannel
    }
    */
    const createSaga = function* (action: CreateAction) {
        yield* call(add, action.payload);
    };
    const putSaga = function* (action: PutAction) {
        yield* call(put, action.payload);
    };
    const updateSaga = function* (action: UpdateAction) {
        yield* call(update, action.payload);
    };
    const upsertSaga = function* (action: UpsertAction) {
        yield* call(upsert, action.payload);
    };
    const deleteSaga = function* (action: DeleteAction) {
        yield* call(deleteDB, action.payload);
    };
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

    const crudRootSaga = function* () {
        yield* allSaga([
            spawn(watchChangesSaga),
            /*
            spawn(watchCreateSaga),
            spawn(watchPutSaga),
            spawn(watchUpdateSaga),
            spawn(watchUpsertSaga),
            spawn(watchDeleteSaga),
            */
            takeEvery(actionTypes.CREATE, wrapSagaWithErrorHandler(createSaga, actionTypes.CREATE)),
            takeEvery(actionTypes.PUT, wrapSagaWithErrorHandler(putSaga, actionTypes.PUT)),
            takeEvery(actionTypes.UPDATE, wrapSagaWithErrorHandler(updateSaga, actionTypes.UPDATE)),
            takeEvery(actionTypes.UPSERT, wrapSagaWithErrorHandler(upsertSaga, actionTypes.UPSERT)),
            takeEvery(actionTypes.DELETE, wrapSagaWithErrorHandler(deleteSaga, actionTypes.DELETE)),
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
        ]);
    };

    const sagas = {
        createBatched: createBatchedSaga,
        putBatched: putBatchedSaga,
        updateBatched: updateBatchedSaga,
        upsertBatched: upsertBatchedSaga,
        deleteBatched: deleteBatchedSaga,
        crudRootSaga,
    };

    return sagas;
}
