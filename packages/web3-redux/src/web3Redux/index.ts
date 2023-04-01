/**
 * EVM transaction data module.
 * Store data relevant to ethereum transactions.
 * @module Transaction
 */

import { web3ReduxSaga } from "./sagas/index.js";
import * as Actions from "./actions/index.js";
import * as Hooks from "./hooks/index.js";
import { Web3ReduxName } from "./common.js";

export const Web3Redux = {
    name: Web3ReduxName,
    actionTypes: {
        CLEAR: Actions.CLEAR,
        INITIALIZE: Actions.INITIALIZE,
    },
    actions: {
        clear: Actions.clear,
        initialize: Actions.initialize,
    },
    sagas: {
        rootSaga: web3ReduxSaga,
    },
    hooks: {
        useInitialize: Hooks.useInitialize,
    },
};
