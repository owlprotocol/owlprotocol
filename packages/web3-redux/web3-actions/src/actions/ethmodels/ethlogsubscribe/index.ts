export * from "./web3SubscribeLogs.js";

import { web3SubscribeLogsAction } from "./web3SubscribeLogs.js";
import { EthLogSubscribeCRUDActions } from "../../../crudactions/ethmodels/ethlogsubscribe.js";

export const EthLogSubscribeActions = {
    ...EthLogSubscribeCRUDActions,
    actions: {
        ...EthLogSubscribeCRUDActions.actions,
        web3SubscribeLogs: web3SubscribeLogsAction,
    },
};
