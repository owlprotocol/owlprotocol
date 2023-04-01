/**
 * EVM call data module.
 * Store EVM call data for caching and searchability.
 * @module EthSend
 */

import * as Actions from "./actions/index.js";
import { EthSendCRUD } from "./crud.js";
import { ethSendSaga } from "./sagas/index.js";
export { EthSendStatus } from './model';

export const EthSend = {
    name: EthSendCRUD.name,
    actionTypes: EthSendCRUD.actionTypes,
    actions: {
        ...EthSendCRUD.actions,
        web3Deploy: Actions.web3DeployAction,
        web3Send: Actions.web3SendAction,
    },
    sagas: {
        ...EthSendCRUD.sagas,
        rootSaga: ethSendSaga,
    },
    hooks: {
        ...EthSendCRUD.hooks,
    },
    selectors: EthSendCRUD.selectors,
    isAction: EthSendCRUD.isAction,
    reducer: EthSendCRUD.reducer,
    validate: EthSendCRUD.validate,
    validateId: EthSendCRUD.validateId,
    validateWithRedux: EthSendCRUD.validateWithRedux,
    encode: EthSendCRUD.encode,
};
