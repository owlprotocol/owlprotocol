import type { HTTPCacheId, HTTPCache, HTTPCacheName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { HTTPCacheId, HTTPCache } from "@owlprotocol/web3-models";

export type HTTPCacheKeyId = string;
export type HTTPCacheKeyIdEq = HTTPCacheId;
const HTTPCacheById = createDexieIndexDefSingle("id");
export const HTTPCacheIdx = [HTTPCacheById].join(",") as Concat<[typeof HTTPCacheById]>;
export type HTTPCacheKeyIdx = {
    [HTTPCacheById]: HTTPCacheKeyId;
};
export type HTTPCacheKeyIdxEq = HTTPCacheId;
export type HTTPCacheKeyIdxEqAny = { id: string[] | string };

export type HTTPCacheTable = CRUDTable<
    typeof HTTPCacheName,
    HTTPCache,
    HTTPCacheKeyId,
    HTTPCacheKeyIdEq,
    HTTPCacheKeyIdx,
    HTTPCacheKeyIdxEq
>;
