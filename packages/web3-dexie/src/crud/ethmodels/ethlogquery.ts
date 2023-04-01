import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { EthLogQuery, EthLogQueryName, validateIdEthLogQuery, toPrimaryKeyEthLogQuery } from "@owlprotocol/web3-models";
import {
    EthLogQueryKeyId,
    EthLogQueryKeyIdEq,
    EthLogQueryKeyIdx,
    EthLogQueryKeyIdxEq,
    EthLogQueryKeyIdxEqAny,
} from "../../tables/ethmodels/ethlogquery.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getEthLogQueryDexie() {
    return createCRUDDB<
        typeof EthLogQueryName,
        EthLogQuery,
        EthLogQueryKeyId,
        EthLogQueryKeyIdEq,
        EthLogQueryKeyIdx,
        EthLogQueryKeyIdxEq,
        EthLogQueryKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[EthLogQueryName], {
        validateId: validateIdEthLogQuery,
        toPrimaryKey: toPrimaryKeyEthLogQuery,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const EthLogQueryDexie = getEthLogQueryDexie();
