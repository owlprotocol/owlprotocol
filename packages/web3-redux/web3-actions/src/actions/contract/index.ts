export * from "./contractCall.js";
export * from "./contractDeploy.js";
export * from "./contractSend.js";
export * from "./fetchAbi.js";
export * from "./getBalance.js";
export * from "./getNonce.js";
export * from "./fetchTransactions.js";
export * from "./getCode.js";
export * from "./getEns.js";
export * from "./contracts.js";

import { contractCallAction } from "./contractCall.js";
import { contractDeployAction } from "./contractDeploy.js";
import { contractSendAction } from "./contractSend.js";
import { fetchAbi } from "./fetchAbi.js";
import { getBalanceAction } from "./getBalance.js";
import { getNonceAction } from "./getNonce.js";
import { fetchTransactions } from "./fetchTransactions.js";
import { getCodeAction } from "./getCode.js";
import { getEnsAction } from "./getEns.js";
import { ContractCRUDActions } from "../../crudactions/contract.js";

export const ContractActions = {
    ...ContractCRUDActions,
    actions: {
        contractCall: contractCallAction,
        contractDeploy: contractDeployAction,
        contractSend: contractSendAction,
        fetchAbi: fetchAbi,
        getBalance: getBalanceAction,
        getNonce: getNonceAction,
        fetchTransactions: fetchTransactions,
        getCode: getCodeAction,
        getEns: getEnsAction,
    },
};
