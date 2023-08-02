export * from "./web3GetPastLogs.js";
export * from "./web3GetPastLogsRaw.js";

import { web3GetPastLogsAction } from "./web3GetPastLogs.js";
import { web3GetPastLogsRawAction } from "./web3GetPastLogsRaw.js";
import { EthLogQueryCRUDActions } from "../../../crudactions/ethmodels/ethlogquery.js";

export const EthLogQueryActions = {
    ...EthLogQueryCRUDActions,
    actions: {
        ...EthLogQueryCRUDActions.actions,
        web3GetPastLogs: web3GetPastLogsAction,
        web3GetPastLogsRaw: web3GetPastLogsRawAction,
    },
};
