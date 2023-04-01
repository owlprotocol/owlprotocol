import type { IPFSCacheId, IPFSCache, IPFSCacheName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { IPFSCacheId, IPFSCache } from "@owlprotocol/web3-models";

export type IPFSCacheKeyId = string;
export type IPFSCacheKeyIdEq = IPFSCacheId;
const IPFSCacheById = createDexieIndexDefSingle("contentId");
const IPFSCacheByPaths = createDexieIndexDefSingle("paths", true);
export const IPFSCacheIdx = [IPFSCacheById].join(",") as Concat<[typeof IPFSCacheById]>;
export type IPFSCacheKeyIdx = {
    [IPFSCacheById]: IPFSCacheKeyId;
    [IPFSCacheByPaths]: string;
};
export type IPFSCacheKeyIdxEq = IPFSCacheId | { paths: string };
export type IPFSCacheKeyIdxEqAny = { contentId: string[] | string } | { paths: string[] | string };

export type IPFSCacheTable = CRUDTable<
    typeof IPFSCacheName,
    IPFSCache,
    IPFSCacheKeyId,
    IPFSCacheKeyIdEq,
    IPFSCacheKeyIdx,
    IPFSCacheKeyIdxEq
>;
