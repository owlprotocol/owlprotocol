import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { EthBlock, EthBlockName } from "@owlprotocol/web3-models";
import {
    EthBlockKeyId,
    EthBlockKeyIdEq,
    EthBlockKeyIdx,
    EthBlockKeyIdxEq,
    EthBlockKeyIdxEqAny,
} from "../../tables/ethmodels/ethblock.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getEthBlockDexie() {
    return createCRUDDB<
        typeof EthBlockName,
        EthBlock,
        EthBlockKeyId,
        EthBlockKeyIdEq,
        EthBlockKeyIdx,
        EthBlockKeyIdxEq,
        EthBlockKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[EthBlockName], {
        validateId: ({ networkId, number }) => {
            return { networkId, number };
        },
        toPrimaryKey: ({ networkId, number }) => {
            return [networkId, number];
        },
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const EthBlockDexie = getEthBlockDexie();
