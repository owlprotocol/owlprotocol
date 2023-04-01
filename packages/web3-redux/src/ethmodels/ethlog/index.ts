/**
 * EthLog module
 * Used to sync past events and subscribe to contract updates.
 * Efficiently stored in IndexedDB to enable optimal querying in the cache.
 * @module EthLog
 */

import { EthLogCRUD } from "./crud.js";
import { ethLogSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const EthLog = {
    name: EthLogCRUD.name,
    actionTypes: EthLogCRUD.actionTypes,
    actions: {
        ...EthLogCRUD.actions,
    },
    sagas: {
        ...EthLogCRUD.sagas,
        rootSaga: ethLogSaga,
    },
    hooks: {
        ...EthLogCRUD.hooks,
        useEthLog: Hooks.useEthLog,
        useEthLogWhere: Hooks.useEthLogWhere,
        useEthLogWhereAnyOf: Hooks.useEthLogWhereAnyOf,
    },
    selectors: EthLogCRUD.selectors,
    isAction: EthLogCRUD.isAction,
    reducer: EthLogCRUD.reducer,
    validate: EthLogCRUD.validate,
    validateId: EthLogCRUD.validateId,
    validateWithRedux: EthLogCRUD.validateWithRedux,
    encode: EthLogCRUD.encode,
};
