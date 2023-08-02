import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { EthLogAbi, EthLogAbiName, validateIdEthLogAbi, toPrimaryKeyEthLogAbi } from "@owlprotocol/web3-models";
import {
    EthLogAbiKeyId,
    EthLogAbiKeyIdEq,
    EthLogAbiKeyIdx,
    EthLogAbiKeyIdxEq,
    EthLogAbiKeyIdxEqAny,
} from "../../tables/ethmodels/ethlogabi.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getEthLogAbiDexie() {
    return createCRUDDB<
        typeof EthLogAbiName,
        EthLogAbi,
        EthLogAbiKeyId,
        EthLogAbiKeyIdEq,
        EthLogAbiKeyIdx,
        EthLogAbiKeyIdxEq,
        EthLogAbiKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[EthLogAbiName], {
        validateId: validateIdEthLogAbi,
        toPrimaryKey: toPrimaryKeyEthLogAbi,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const EthLogAbiDexie = getEthLogAbiDexie();
