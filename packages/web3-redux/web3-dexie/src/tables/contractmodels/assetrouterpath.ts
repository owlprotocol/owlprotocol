import type { AssetRouterPathId, AssetRouterPath, AssetRouterPathName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { AssetRouterPathId, AssetRouterPath } from "@owlprotocol/web3-models";

export type AssetRouterPathKeyId = [networkId: string, from: string, to: string];
export type AssetRouterPathKeyIdEq = AssetRouterPathId;

const AssetRouterPathById = createDexieIndexDefSingle(["networkId", "from", "to"] as ["networkId", "from", "to"]);
const AssetRouterPathByFrom = createDexieIndexDefSingle(["networkId", "from"] as ["networkId", "from"]);
const AssetRouterPathByTo = createDexieIndexDefSingle(["networkId", "to"] as ["networkId", "to"]);
export const AssetRouterPathIdx = [AssetRouterPathById, AssetRouterPathByFrom, AssetRouterPathByTo].join(",") as Concat<
    [typeof AssetRouterPathById, typeof AssetRouterPathByFrom, typeof AssetRouterPathByTo]
>;
export type AssetRouterPathKeyIdx = {
    [AssetRouterPathById]: AssetRouterPathKeyId;
    [AssetRouterPathByFrom]: [networkId: string, from: string];
    [AssetRouterPathByTo]: [networkId: string, to: string];
};

export type AssetRouterPathKeyIdxEq =
    | AssetRouterPathId
    | { networkId: string; from: string }
    | { networkId: string; to: string };

export type AssetRouterPathKeyIdxEqAny =
    | { networkId: string[] | string; from: string[] | string; to: string[] | string }
    | { networkId: string[] | string; from: string[] | string }
    | { networkId: string[] | string; to: string[] | string };

export type AssetRouterPathTable = CRUDTable<
    typeof AssetRouterPathName,
    AssetRouterPath,
    AssetRouterPathKeyId,
    AssetRouterPathKeyIdEq,
    AssetRouterPathKeyIdx,
    AssetRouterPathKeyIdxEq
>;
