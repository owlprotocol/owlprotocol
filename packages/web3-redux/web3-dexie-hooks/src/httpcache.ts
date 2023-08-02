import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    HTTPCacheDexie,
    HTTPCache,
    HTTPCacheKeyId,
    HTTPCacheKeyIdx,
    HTTPCacheKeyIdEq,
    HTTPCacheKeyIdxEq,
    HTTPCacheKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const HTTPCacheDexieHooks = createCRUDDexieHooks<
    HTTPCache,
    HTTPCacheKeyId,
    HTTPCacheKeyIdx,
    HTTPCacheKeyIdEq,
    HTTPCacheKeyIdxEq,
    HTTPCacheKeyIdxEqAny
>(HTTPCacheDexie);
