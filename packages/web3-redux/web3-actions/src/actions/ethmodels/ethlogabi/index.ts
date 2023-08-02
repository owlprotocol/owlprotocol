export * from "./fetch.js";

import { fetchEthLogAbiAction } from "./fetch.js";
import { EthLogAbiCRUDActions } from "../../../crudactions/ethmodels/ethlogabi.js";

export const EthLogAbiActions = {
    ...EthLogAbiCRUDActions,
    actions: {
        ...EthLogAbiCRUDActions.actions,
        fetchEthLogAbi: fetchEthLogAbiAction,
    },
};
