/**
 * EVM transaction data module.
 * Store data relevant to ethereum transactions.
 * @module Transaction
 */

export * from "./model/index.js";

import { EthTransactionCRUD } from "./crud.js";
import { ethTransactionSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const EthTransaction = {
    name: EthTransactionCRUD.name,
    actionTypes: EthTransactionCRUD.actionTypes,
    actions: {
        ...EthTransactionCRUD.actions,
    },
    sagas: {
        ...EthTransactionCRUD.sagas,
        rootSaga: ethTransactionSaga,
    },
    hooks: {
        ...EthTransactionCRUD.hooks,
        useTransaction: Hooks.useTransaction,
    },
    selectors: EthTransactionCRUD.selectors,
    isAction: EthTransactionCRUD.isAction,
    reducer: EthTransactionCRUD.reducer,
    validate: EthTransactionCRUD.validate,
    validateId: EthTransactionCRUD.validateId,
    validateWithRedux: EthTransactionCRUD.validateWithRedux,
    encode: EthTransactionCRUD.encode,
};
