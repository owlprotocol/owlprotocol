import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    IPFSCacheDexie,
    IPFSCache,
    IPFSCacheKeyId,
    IPFSCacheKeyIdx,
    IPFSCacheKeyIdEq,
    IPFSCacheKeyIdxEq,
    IPFSCacheKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const IPFSCacheDexieHooks = createCRUDDexieHooks<
    IPFSCache,
    IPFSCacheKeyId,
    IPFSCacheKeyIdx,
    IPFSCacheKeyIdEq,
    IPFSCacheKeyIdxEq,
    IPFSCacheKeyIdxEqAny
>(IPFSCacheDexie);
