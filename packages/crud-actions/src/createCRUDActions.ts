import type { Action } from "@reduxjs/toolkit";

import { IndexableType } from "./types/index.js";
import { createAction2 } from "./createAction.js";

/**
 *
 * Creates common CRUD actions for a Redux/Dexie model.
 * Automatically infers types.
 *
 * @param name
 * @param validators Validators used to sanitize data
 * @returns
 */
export function createCRUDActions<U extends string, TKeyIdEq, T = TKeyIdEq, TPartial = T, TRedux = T>(
    name: U,
    validators: {
        validateId: (id: TKeyIdEq) => TKeyIdEq;
        validate: (item: TPartial) => T;
        toPrimaryKeyString: (id: TKeyIdEq) => string;
    },
) {
    const { validateId, validate, toPrimaryKeyString } = validators;

    /** Actions */
    const DB = `${name}/DB` as const;
    const DB_CREATING = `${DB}/CREATING` as const;
    const DB_UPDATING = `${DB}/UPDATING` as const;
    const DB_DELETING = `${DB}/DELETING` as const;

    const REDUX = `${name}/REDUX` as const;
    const REDUX_UPSERT = `${REDUX}/UPSERT` as const;
    const REDUX_UPSERT_BATCHED = `${REDUX_UPSERT}/BATCHED` as const;
    const REDUX_DELETE = `${REDUX}/DELETE` as const;

    //(name)_CRUD_(BATCHED) Actions Write to IndexedDB
    //(CRUD)_POST actions send notifications once action is complete and can be used by other workers
    const CREATE = `${name}/CREATE` as const;
    const CREATE_BATCHED = `${CREATE}/BATCHED` as const;

    const PUT = `${name}/PUT` as const;
    const PUT_BATCHED = `${PUT}/BATCHED` as const;

    const UPDATE = `${name}/UPDATE` as const;
    const UPDATE_BATCHED = `${UPDATE}/BATCHED` as const;

    const UPSERT = `${name}/UPSERT` as const;
    const UPSERT_BATCHED = `${UPSERT}/BATCHED` as const;

    const DELETE = `${name}/DELETE` as const;
    const DELETE_BATCHED = `${DELETE}/BATCHED` as const;

    const dbCreatingAction = createAction2(DB_CREATING, (payload: { primKey: IndexableType; obj: T }) => payload);
    const dbUpdatingAction = createAction2(
        DB_UPDATING,
        (payload: { primKey: IndexableType; obj: T; mods: Partial<T> /*updatedObj: T_Encoded*/ }) => {
            return payload;
        },
    );
    const dbDeletingAction = createAction2(DB_DELETING, (payload: { primKey: IndexableType; obj: T }) => payload);

    const reduxUpsertAction = createAction2(REDUX_UPSERT, (payload: TRedux) => {
        return payload;
    });
    const reduxUpsertBatchedAction = createAction2(REDUX_UPSERT_BATCHED, (payload: TRedux[]) => {
        return payload;
    });
    const reduxDeleteAction = createAction2(REDUX_DELETE, (payload: TKeyIdEq) => {
        return toPrimaryKeyString(payload);
    });

    const createAction = createAction2(CREATE, validate);
    const createBatchedAction = createAction2(CREATE_BATCHED, (payload: TPartial[]) => {
        return payload.map(validate);
    });

    const putAction = createAction2(PUT, validate);
    const putBatchedAction = createAction2(PUT_BATCHED, (payload: TPartial[]) => {
        return payload.map(validate);
    });

    const updateAction = createAction2(UPDATE, validate);
    const updateBatchedAction = createAction2(UPDATE_BATCHED, (payload: TPartial[]) => {
        return payload.map(validate);
    });

    const upsertAction = createAction2(UPSERT, validate);
    const upsertBatchedAction = createAction2(UPSERT_BATCHED, (payload: TPartial[]) => {
        return payload.map(validate);
    });

    /** @category Actions */
    function setAction<K extends keyof T = keyof T>(
        {
            id,
            key,
            value,
        }: {
            id: TKeyIdEq;
            key: K;
            value: T[K];
        },
        uuid?: string | undefined,
        ts?: number | undefined,
    ) {
        return upsertAction({ ...id, [key]: value } as TPartial, uuid, ts);
    }

    const deleteAction = createAction2(DELETE, validateId);
    const deleteBatchedAction = createAction2(DELETE_BATCHED, (payload: TKeyIdEq[]) => {
        return payload.map(validateId);
    });

    const actionTypes = {
        DB_CREATING,
        DB_UPDATING,
        DB_DELETING,
        REDUX_UPSERT,
        REDUX_UPSERT_BATCHED,
        REDUX_DELETE,
        CREATE,
        CREATE_BATCHED,
        PUT,
        PUT_BATCHED,
        UPDATE,
        UPDATE_BATCHED,
        UPSERT,
        UPSERT_BATCHED,
        DELETE,
        DELETE_BATCHED,
    };

    const actions = {
        dbCreating: dbCreatingAction,
        dbUpdating: dbUpdatingAction,
        dbDeleting: dbDeletingAction,
        reduxUpsert: reduxUpsertAction,
        reduxUpsertBatched: reduxUpsertBatchedAction,
        reduxDelete: reduxDeleteAction,
        create: createAction,
        createBatched: createBatchedAction,
        put: putAction,
        putBatched: putBatchedAction,
        update: updateAction,
        updateBatched: updateBatchedAction,
        upsert: upsertAction,
        set: setAction,
        upsertBatched: upsertBatchedAction,
        delete: deleteAction,
        deleteBatched: deleteBatchedAction,
    };

    const isReduxAction = (action: Action) => {
        return (
            actions.reduxUpsert.match(action) ||
            actions.reduxUpsertBatched.match(action) ||
            actions.reduxDelete.match(action)
        );
    };

    const isDbAction = (action: Action) => {
        return actions.dbCreating.match(action) || actions.dbUpdating.match(action) || actions.dbDeleting.match(action);
    };

    const isAction = (action: Action) => {
        return (
            actions.create.match(action) ||
            actions.createBatched.match(action) ||
            actions.put.match(action) ||
            actions.putBatched.match(action) ||
            actions.update.match(action) ||
            actions.updateBatched.match(action) ||
            actions.upsert.match(action) ||
            actions.upsertBatched.match(action) ||
            actions.delete.match(action) ||
            actions.deleteBatched.match(action) ||
            isDbAction(action) ||
            isReduxAction(action)
        );
    };

    return {
        actions,
        actionTypes,
        isAction,
        isReduxAction,
        isDbAction,
    };
}
