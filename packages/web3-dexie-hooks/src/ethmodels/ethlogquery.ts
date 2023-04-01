import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    EthLogQueryDexie,
    EthLogQuery,
    EthLogQueryKeyId,
    EthLogQueryKeyIdx,
    EthLogQueryKeyIdEq,
    EthLogQueryKeyIdxEq,
    EthLogQueryKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const EthLogQueryDexieHooks = createCRUDDexieHooks<
    EthLogQuery,
    EthLogQueryKeyId,
    EthLogQueryKeyIdx,
    EthLogQueryKeyIdEq,
    EthLogQueryKeyIdxEq,
    EthLogQueryKeyIdxEqAny
>(EthLogQueryDexie);
