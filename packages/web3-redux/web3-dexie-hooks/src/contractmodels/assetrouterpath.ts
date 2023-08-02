import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    AssetRouterPathDexie,
    AssetRouterPath,
    AssetRouterPathKeyId,
    AssetRouterPathKeyIdx,
    AssetRouterPathKeyIdEq,
    AssetRouterPathKeyIdxEq,
    AssetRouterPathKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const AssetRouterPathDexieHooks = createCRUDDexieHooks<
    AssetRouterPath,
    AssetRouterPathKeyId,
    AssetRouterPathKeyIdx,
    AssetRouterPathKeyIdEq,
    AssetRouterPathKeyIdxEq,
    AssetRouterPathKeyIdxEqAny
>(AssetRouterPathDexie);
