export * from "./web3Call.js";
export * from "./web3CallBatched.js";

import { web3CallAction } from "./web3Call.js";
import { web3CallBatchedAction } from "./web3CallBatched.js";
import { EthCallCRUDActions } from "../../../crudactions/ethmodels/ethcall.js";

export const EthCallActions = {
    ...EthCallCRUDActions,
    actions: {
        ...EthCallCRUDActions.actions,
        web3Call: web3CallAction,
        web3CallBatched: web3CallBatchedAction,
    },
};
