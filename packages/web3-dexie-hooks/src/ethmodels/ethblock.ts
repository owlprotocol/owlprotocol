import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    EthBlockDexie,
    EthBlock,
    EthBlockKeyId,
    EthBlockKeyIdx,
    EthBlockKeyIdEq,
    EthBlockKeyIdxEq,
    EthBlockKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const EthBlockDexieHooks = createCRUDDexieHooks<
    EthBlock,
    EthBlockKeyId,
    EthBlockKeyIdx,
    EthBlockKeyIdEq,
    EthBlockKeyIdxEq,
    EthBlockKeyIdxEqAny
>(EthBlockDexie);
