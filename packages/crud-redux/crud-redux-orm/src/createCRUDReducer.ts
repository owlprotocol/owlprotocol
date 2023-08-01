import type { AnyAction, PayloadAction } from "@reduxjs/toolkit";

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
    T_Redux = T_Encoded,
>(
    name: U,
    validators: {
        validateWithRedux: (item: T_Encoded | T_Redux, sess: any) => T_Redux;
    },
    crudActions: {
        isReduxUpsertAction: (action: AnyAction) => action is PayloadAction<T_Redux, `${U}/REDUX/UPSERT`, any, any>;
        isReduxUpsertBatchedAction: (
            action: AnyAction,
        ) => action is PayloadAction<T_Redux[], `${U}/REDUX/UPSERT/BATCHED`, any, any>;
        isReduxDeleteAction: (action: AnyAction) => action is PayloadAction<string, `${U}/REDUX/DELETE`, any, any>;
    },
) {
    const { validateWithRedux } = validators;
    const { isReduxUpsertAction, isReduxUpsertBatchedAction, isReduxDeleteAction } = crudActions;

    /** Redux ORM Reducer */
    const reducer = (sess: any, action: AnyAction) => {
        const Model = sess[name];
        if (isReduxUpsertAction(action)) {
            Model.upsert(validateWithRedux(action.payload, sess), sess);
        } else if (isReduxUpsertBatchedAction(action)) {
            action.payload.forEach((p: any) => {
                Model.upsert(validateWithRedux(p, sess), sess);
            });
        } else if (isReduxDeleteAction(action)) {
            Model.withId(action.payload)?.delete();
        }
        return sess;
    };

    return reducer;
}
