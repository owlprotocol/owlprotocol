export * from "./fetch.js";

import { fetchEthCallAbiAction } from "./fetch.js";
import { EthCallAbiCRUDActions } from "../../../crudactions/ethmodels/ethcallabi.js";

export const EthCallAbiActions = {
    ...EthCallAbiCRUDActions,
    actions: {
        ...EthCallAbiCRUDActions.actions,
        fetchEthCallAbi: fetchEthCallAbiAction,
    },
};
