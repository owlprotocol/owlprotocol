/* eslint-disable @typescript-eslint/no-var-requires */
import { Action, Reducer, combineReducers } from "redux";
import { ChildCRUDActions } from "@owlprotocol/crud-actions/test";

import { TestORM, initializeTestState } from "./orm.js";
import { ChildReducer } from "./child-reducer.js";

export const testReduxReducerWithOrm: Reducer = (state: any, action: Action) => {
    const sess = TestORM.session(state || initializeTestState(TestORM));

    if (ChildCRUDActions.isReduxAction(action)) ChildReducer(sess, action);
    return sess.state;
};

export const createTestReduxRootReducer = (reducer: Reducer) => {
    return combineReducers({
        ["TestRedux"]: reducer,
    });
};

export const testRootReducer = createTestReduxRootReducer(testReduxReducerWithOrm);
