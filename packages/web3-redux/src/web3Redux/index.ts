/**
 * EVM transaction data module.
 * Store data relevant to ethereum transactions.
 * @module Transaction
 */

import { rootSaga } from './sagas/index.js';
import * as Actions from './actions/index.js'
import * as Hooks from './hooks/index.js';
import { name } from './common.js';

export const Web3Redux = {
    name,
    actionTypes: {
        INITIALIZE: Actions.INITIALIZE
    },
    actions: {
        initialize: Actions.initialize,
    },
    sagas: {
        rootSaga,
    },
    hooks: {
        useInitialize: Hooks.useInitialize,
    },
};
