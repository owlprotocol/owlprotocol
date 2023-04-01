/* eslint-disable @typescript-eslint/no-var-requires */
import { Action, Reducer, combineReducers } from "redux";
import { REDUX_ROOT } from "./common.js";
import { ConfigCRUD } from "./config/crud.js";
import { EthLogSubscribeCRUD } from "./ethmodels/ethlogsubscribe/crud.js";
import { NetworkCRUD } from "./network/crud.js";

import { getOrm, initializeState } from "./orm.js";

export const reducerWithOrm: Reducer = (state: any, action: Action) => {
    const orm = getOrm();
    const sess = orm.session(state || initializeState(orm));

    if (ConfigCRUD.isAction(action)) ConfigCRUD.reducer(sess, action);
    else if (NetworkCRUD.isAction(action)) NetworkCRUD.reducer(sess, action);
    else if (EthLogSubscribeCRUD.isAction(action)) EthLogSubscribeCRUD.reducer(sess, action);

    return sess.state;
};

export const createRootReducer = (reducerWeb3Redux: Reducer) => {
    return combineReducers({
        [REDUX_ROOT]: reducerWeb3Redux,
    });
};

export const rootReducer = createRootReducer(reducerWithOrm);
