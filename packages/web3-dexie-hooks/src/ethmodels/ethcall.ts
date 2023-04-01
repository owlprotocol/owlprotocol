import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    EthCallDexie,
    EthCall,
    EthCallKeyId,
    EthCallKeyIdx,
    EthCallKeyIdEq,
    EthCallKeyIdxEq,
    EthCallKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const EthCallDexieHooks = createCRUDDexieHooks<
    EthCall,
    EthCallKeyId,
    EthCallKeyIdx,
    EthCallKeyIdEq,
    EthCallKeyIdxEq,
    EthCallKeyIdxEqAny
>(EthCallDexie);
