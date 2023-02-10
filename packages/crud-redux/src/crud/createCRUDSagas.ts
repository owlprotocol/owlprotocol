import { put as putDispatch, select as selectSaga, call, all as allSaga, takeEvery } from 'typed-redux-saga';
import { compact, isEqual } from 'lodash-es';
import type { BroadcastChannel } from 'broadcast-channel';

import { wrapSagaWithErrorHandler } from '../error/sagas/wrapSagaWithErrorHandler.js';
import { T_Encoded_Base } from './model.js';
import { createCRUDActions } from './createCRUDActions.js';
import { createCRUDDB } from './createCRUDDB.js';
import { createCRUDSelectors } from './createCRUDSelectors.js';
import { createCRUDValidators } from './createCRUDValidators.js';

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

    const { encode } = crudValidators;
    const { actions, actionTypes } = crudActions
    const {
        selectByIdSingle
    } = crudSelectors
    const {
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

    /** Dexie Sagas */
    const createSaga = function* (action: CreateAction) {
        yield* call(add, action.payload);
        channel?.postMessage(actions.createPost(action.payload, action.meta.uuid))
    };
    const createBatchedSaga = function* (action: CreateBatchedAction) {
        yield* call(bulkAdd, action.payload);
        channel?.postMessage(actions.createBatchedPost(action.payload, action.meta.uuid))
    };
    const putSaga = function* (action: PutAction) {
        yield* call(put, action.payload);
        channel?.postMessage(actions.putPost(action.payload, action.meta.uuid))
    };
    const putBatchedSaga = function* (action: PutBatchedAction) {
        yield* call(bulkPut, action.payload);
        channel?.postMessage(actions.putBatchedPost(action.payload, action.meta.uuid))
    };
    const updateSaga = function* (action: UpdateAction) {
        yield* call(update, action.payload);
        channel?.postMessage(actions.updatePost(action.payload, action.meta.uuid))
    };
    const updateBatchedSaga = function* (action: UpdateBatchedAction) {
        yield* call(bulkUpdate, action.payload);
        channel?.postMessage(actions.updateBatchedPost(action.payload, action.meta.uuid))
    };
    const upsertSaga = function* (action: UpsertAction) {
        yield* call(upsert, action.payload);
        channel?.postMessage(actions.upsertPost(action.payload, action.meta.uuid))
    };
    const upsertBatchedSaga = function* (action: UpsertBatchedAction) {
        yield* call(bulkUpsert, action.payload);
        channel?.postMessage(actions.upsertBatchedPost(action.payload, action.meta.uuid))
    };
    const deleteSaga = function* (action: DeleteAction) {
        yield* call(deleteDB, action.payload);
        channel?.postMessage(actions.deletePost(action.payload, action.meta.uuid))
    };
    const deleteBatchedSaga = function* (action: DeleteBatchedAction) {
        yield* call(bulkDelete, action.payload);
        channel?.postMessage(actions.deleteBatchedPost(action.payload, action.meta.uuid))
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

    return sagas
}
