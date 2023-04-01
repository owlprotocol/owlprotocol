import type { Action } from "@reduxjs/toolkit";

import { createCRUDActions } from "./createCRUDActions.js";

/**
 *
 * Creates common CRUD Reducer
 *
 * @param name
 * @param validators Validators used to sanitize data
 * @param crudActions CRUD Actions
 * @returns
 */
export function createCRUDReducer<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends T_ID = T_ID,
    T_Partial = T_Encoded,
    T_Redux = T_Encoded,
>(
    name: U,
    validators: {
        validateWithRedux: (item: T_Encoded | T_Redux, sess: any) => T_Redux;
    },
    crudActions: ReturnType<typeof createCRUDActions<U, T_ID, T_Encoded, T_Partial, T_Redux>>,
) {
    const { validateWithRedux } = validators;
    const { actions } = crudActions;

    /** Redux ORM Reducer */
    const reducer = (sess: any, action: Action) => {
        const Model = sess[name];
        if (actions.reduxUpsert.match(action)) {
            Model.upsert(validateWithRedux(action.payload, sess), sess);
        } else if (actions.reduxUpsertBatched.match(action)) {
            action.payload.forEach((p) => {
                Model.upsert(validateWithRedux(p, sess), sess);
            });
        } else if (actions.reduxDelete.match(action)) {
            Model.withId(action.payload)?.delete();
        }
        return sess;
    };

    return reducer;
}
