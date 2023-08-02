/* eslint-disable @typescript-eslint/no-var-requires */
import { Action, Reducer, combineReducers } from "redux";
import { ConfigCRUDActions, NetworkCRUDActions, EthLogSubscribeCRUDActions } from "@owlprotocol/web3-actions";

import { orm, initializeState } from "./orm.js";
import { ConfigReducer, NetworkReducer, EthLogSubscribeReducer } from "./reducers/index.js";

export const reducerWithOrm: Reducer = (state: any, action: Action) => {
    const sess = orm.session(state || initializeState(orm));

    if (ConfigCRUDActions.isReduxAction(action)) ConfigReducer(sess, action);
    else if (NetworkCRUDActions.isReduxAction(action)) NetworkReducer(sess, action);
    else if (EthLogSubscribeCRUDActions.isReduxAction(action)) EthLogSubscribeReducer(sess, action);

    return sess.state;
};

export const createRootReducer = (reducerWeb3Redux: Reducer) => {
    return combineReducers({
        ["web3Redux"]: reducerWeb3Redux,
    });
};

export const rootReducer = createRootReducer(reducerWithOrm);
