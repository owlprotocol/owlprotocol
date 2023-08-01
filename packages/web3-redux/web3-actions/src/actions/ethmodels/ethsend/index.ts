export * from "./web3Deploy.js";
export * from "./web3Send.js";

import { web3DeployAction } from "./web3Deploy.js";
import { web3SendAction } from "./web3Send.js";
import { EthSendCRUDActions } from "../../../crudactions/ethmodels/ethsend.js";

export const EthSendActions = {
    ...EthSendCRUDActions,
    actions: {
        ...EthSendCRUDActions.actions,
        web3Deploy: web3DeployAction,
        web3Send: web3SendAction,
    },
};
