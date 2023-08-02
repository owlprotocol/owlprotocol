import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    EthLogSubscribeDexie,
    EthLogSubscribe,
    EthLogSubscribeKeyId,
    EthLogSubscribeKeyIdx,
    EthLogSubscribeKeyIdEq,
    EthLogSubscribeKeyIdxEq,
    EthLogSubscribeKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const EthLogSubscribeDexieHooks = createCRUDDexieHooks<
    EthLogSubscribe,
    EthLogSubscribeKeyId,
    EthLogSubscribeKeyIdx,
    EthLogSubscribeKeyIdEq,
    EthLogSubscribeKeyIdxEq,
    EthLogSubscribeKeyIdxEqAny
>(EthLogSubscribeDexie);
