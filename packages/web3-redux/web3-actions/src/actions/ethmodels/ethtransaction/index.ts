export * from "./fetch.js";

import { fetchTransactionAction } from "./fetch.js";
import { EthTransactionCRUDActions } from "../../../crudactions/ethmodels/ethtransaction.js";

export const EthTransactionActions = {
    ...EthTransactionCRUDActions,
    actions: {
        ...EthTransactionCRUDActions.actions,
        fetchTransaction: fetchTransactionAction,
    },
};
