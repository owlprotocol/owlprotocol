import { createCRUDDB } from "@owlprotocol/crud-dexie";
import {
    EthTransaction,
    EthTransactionName,
    validateIdEthTransaction,
    toPrimaryKeyEthTransaction,
} from "@owlprotocol/web3-models";
import {
    EthTransactionKeyId,
    EthTransactionKeyIdEq,
    EthTransactionKeyIdx,
    EthTransactionKeyIdxEq,
    EthTransactionKeyIdxEqAny,
} from "../../tables/ethmodels/ethtransaction.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getEthTransactionDexie() {
    return createCRUDDB<
        typeof EthTransactionName,
        EthTransaction,
        EthTransactionKeyId,
        EthTransactionKeyIdEq,
        EthTransactionKeyIdx,
        EthTransactionKeyIdxEq,
        EthTransactionKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[EthTransactionName], {
        validateId: validateIdEthTransaction,
        toPrimaryKey: toPrimaryKeyEthTransaction,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const EthTransactionDexie = getEthTransactionDexie();
