import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    EthLogAbiDexie,
    EthLogAbi,
    EthLogAbiKeyId,
    EthLogAbiKeyIdx,
    EthLogAbiKeyIdEq,
    EthLogAbiKeyIdxEq,
    EthLogAbiKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const EthLogAbiDexieHooks = createCRUDDexieHooks<
    EthLogAbi,
    EthLogAbiKeyId,
    EthLogAbiKeyIdx,
    EthLogAbiKeyIdEq,
    EthLogAbiKeyIdxEq,
    EthLogAbiKeyIdxEqAny
>(EthLogAbiDexie);
