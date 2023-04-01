import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    EthLogDexie,
    EthLog,
    EthLogKeyId,
    EthLogKeyIdx,
    EthLogKeyIdEq,
    EthLogKeyIdxEq,
    EthLogKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const EthLogDexieHooks = createCRUDDexieHooks<
    EthLog,
    EthLogKeyId,
    EthLogKeyIdx,
    EthLogKeyIdEq,
    EthLogKeyIdxEq,
    EthLogKeyIdxEqAny
>(EthLogDexie);
