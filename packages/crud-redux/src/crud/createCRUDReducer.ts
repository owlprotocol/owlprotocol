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
    validators: ReturnType<typeof createCRUDValidators<T_ID, T_Encoded, T>>,
    crudActions: ReturnType<typeof createCRUDActions<U, T_ID, T_Encoded, T, T_Idx>>
) {

    const {
        hydrate,
        toPrimaryKeyString } = validators;
    const { actions } = crudActions


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

    return reducer;
}
