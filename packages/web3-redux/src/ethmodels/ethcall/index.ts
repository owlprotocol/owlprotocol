/**
 * EVM call data module.
 * Store EVM call data for caching and searchability.
 * @module EthCall
 */

import * as Actions from "./actions/index.js";
import { EthCallCRUD } from "./crud.js";
import { ethCallSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const EthCall = {
    name: EthCallCRUD.name,
    actionTypes: EthCallCRUD.actionTypes,
    actions: {
        ...EthCallCRUD.actions,
        web3Call: Actions.web3CallAction,
        web3CallBatched: Actions.web3CallBatchedAction,
    },
    sagas: {
        ...EthCallCRUD.sagas,
        rootSaga: ethCallSaga,
    },
    hooks: {
        ...EthCallCRUD.hooks,
        useEthCall: Hooks.useEthCall,
        useEthCallWhere: Hooks.useEthCallWhere,
        useEthCallWhereAnyOf: Hooks.useEthCallWhereAnyOf,
    },
    selectors: EthCallCRUD.selectors,
    isAction: EthCallCRUD.isAction,
    reducer: EthCallCRUD.reducer,
    validate: EthCallCRUD.validate,
    validateId: EthCallCRUD.validateId,
    validateWithRedux: EthCallCRUD.validateWithRedux,
    encode: EthCallCRUD.encode,
};
