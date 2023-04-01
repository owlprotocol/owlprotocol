import { createCRUDDB } from "@owlprotocol/crud-dexie";
import {
    EthLogSubscribe,
    EthLogSubscribeName,
    validateIdEthLogSubscribe,
    toPrimaryKeyEthLogSubscribe,
} from "@owlprotocol/web3-models";
import {
    EthLogSubscribeKeyId,
    EthLogSubscribeKeyIdEq,
    EthLogSubscribeKeyIdx,
    EthLogSubscribeKeyIdxEq,
    EthLogSubscribeKeyIdxEqAny,
} from "../../tables/ethmodels/ethlogsubscribe.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getEthLogSubscribeDexie() {
    return createCRUDDB<
        typeof EthLogSubscribeName,
        EthLogSubscribe,
        EthLogSubscribeKeyId,
        EthLogSubscribeKeyIdEq,
        EthLogSubscribeKeyIdx,
        EthLogSubscribeKeyIdxEq,
        EthLogSubscribeKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[EthLogSubscribeName], {
        validateId: validateIdEthLogSubscribe,
        toPrimaryKey: toPrimaryKeyEthLogSubscribe,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const EthLogSubscribeDexie = getEthLogSubscribeDexie();
