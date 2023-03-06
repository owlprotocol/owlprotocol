import type { Action } from '@reduxjs/toolkit';
import { T_Encoded_Base } from './model.js';
import { createCRUDValidators } from './createCRUDValidators.js';
import { createCRUDActions } from './createCRUDActions.js';

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
    T_Encoded extends (T_ID & T_Encoded_Base) = T_ID & T_Encoded_Base,
    T extends T_Encoded = T_Encoded,
    T_Idx = T_ID,
>(
    name: U,
    crudValidators: ReturnType<typeof createCRUDValidators<T_ID, T_Encoded, T>>,
    crudActions: ReturnType<typeof createCRUDActions<U, T_ID, T_Encoded, T, T_Idx>>
) {

    const { hydrate } = crudValidators
    const { actions } = crudActions

    /** Redux ORM Reducer */
    const reducer = (sess: any, action: Action) => {
        const Model = sess[name];
        if (actions.reduxUpsert.match(action)) {
            Model.upsert(hydrate(action.payload, sess), sess);
        } else if (actions.reduxUpsertBatched.match(action)) {
            action.payload.forEach((p) => {
                Model.upsert(hydrate(p, sess), sess);
            })
        } else if (actions.reduxDelete.match(action)) {
            Model.withId(action.payload)?.delete();
        }
        return sess;
    };

    return reducer;
}
