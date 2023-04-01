import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { EthCallAbi, EthCallAbiName, validateIdEthCallAbi, toPrimaryKeyEthCallAbi } from "@owlprotocol/web3-models";
import {
    EthCallAbiKeyId,
    EthCallAbiKeyIdEq,
    EthCallAbiKeyIdx,
    EthCallAbiKeyIdxEq,
    EthCallAbiKeyIdxEqAny,
} from "../../tables/ethmodels/ethcallabi.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getEthCallAbiDexie() {
    return createCRUDDB<
        typeof EthCallAbiName,
        EthCallAbi,
        EthCallAbiKeyId,
        EthCallAbiKeyIdEq,
        EthCallAbiKeyIdx,
        EthCallAbiKeyIdxEq,
        EthCallAbiKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[EthCallAbiName], {
        validateId: validateIdEthCallAbi,
        toPrimaryKey: toPrimaryKeyEthCallAbi,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const EthCallAbiDexie = getEthCallAbiDexie();
