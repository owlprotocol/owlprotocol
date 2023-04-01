import type { Action } from "@reduxjs/toolkit";

import { IndexableType } from "dexie";
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
export function createCRUDActions<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends T_ID = T_ID,
    T_Partial = T_Encoded,
    T_Redux = T_Encoded,
>(
    name: U,
    validators: {
        validateId: (id: T_ID) => T_ID;
        validate: (item: T_Partial) => T_Encoded;
        toPrimaryKeyString: (id: T_ID | string) => string;
    },
) {
    const { validateId, validate, toPrimaryKeyString } = validators;

    /** Actions */
    const DB = `${name}/DB`;
    const DB_CREATING = `${DB}/CREATING`;
    const DB_UPDATING = `${DB}/UPDATING`;
    const DB_DELETING = `${DB}/DELETING`;

    const REDUX = `${name}/REDUX`;
    const REDUX_UPSERT = `${REDUX}/UPSERT`;
    const REDUX_UPSERT_BATCHED = `${REDUX_UPSERT}/BATCHED`;
    const REDUX_DELETE = `${REDUX}/DELETE`;

    //(name)_CRUD_(BATCHED) Actions Write to IndexedDB
    //(CRUD)_POST actions send notifications once action is complete and can be used by other workers
    const CREATE = `${name}/CREATE`;
    const CREATE_BATCHED = `${CREATE}/BATCHED`;

    const PUT = `${name}/PUT`;
    const PUT_BATCHED = `${PUT}/BATCHED`;

    const UPDATE = `${name}/UPDATE`;
    const UPDATE_BATCHED = `${UPDATE}/BATCHED`;

    const UPSERT = `${name}/UPSERT`;
    const UPSERT_BATCHED = `${UPSERT}/BATCHED`;

    const DELETE = `${name}/DELETE`;
    const DELETE_BATCHED = `${DELETE}/BATCHED`;

    const dbCreatingAction = createAction2(
        DB_CREATING,
        (payload: { primKey: IndexableType; obj: T_Encoded }) => payload,
    );
    const dbUpdatingAction = createAction2(
        DB_UPDATING,
        (payload: { primKey: IndexableType; obj: T_Encoded; mods: Partial<T_Encoded> /*updatedObj: T_Encoded*/ }) => {
            return payload;
        },
    );
    const dbDeletingAction = createAction2(
        DB_DELETING,
        (payload: { primKey: IndexableType; obj: T_Encoded }) => payload,
    );

    const reduxUpsertAction = createAction2(REDUX_UPSERT, (payload: T_Redux) => {
        return payload;
    });
    const reduxUpsertBatchedAction = createAction2(REDUX_UPSERT_BATCHED, (payload: T_Redux[]) => {
        return payload;
    });
    const reduxDeleteAction = createAction2(REDUX_DELETE, (payload: T_ID) => {
        return toPrimaryKeyString(payload);
    });

    const createAction = createAction2(CREATE, validate);
    const createBatchedAction = createAction2(CREATE_BATCHED, (payload: T_Partial[]) => {
        return payload.map(validate);
    });

    const putAction = createAction2(PUT, validate);
    const putBatchedAction = createAction2(PUT_BATCHED, (payload: T_Partial[]) => {
        return payload.map(validate);
    });

    const updateAction = createAction2(UPDATE, validate);
    const updateBatchedAction = createAction2(UPDATE_BATCHED, (payload: T_Partial[]) => {
        return payload.map(validate);
    });

    const upsertAction = createAction2(UPSERT, validate);
    const upsertBatchedAction = createAction2(UPSERT_BATCHED, (payload: T_Partial[]) => {
        return payload.map(validate);
    });

    const deleteAction = createAction2(DELETE, validateId);
    const deleteBatchedAction = createAction2(DELETE_BATCHED, (payload: T_ID[]) => {
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
        isDbAction,
    };
}
