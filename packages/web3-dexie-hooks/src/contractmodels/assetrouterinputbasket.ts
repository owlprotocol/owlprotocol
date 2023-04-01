import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    AssetRouterInputBasketDexie,
    AssetRouterInputBasket,
    AssetRouterInputBasketKeyId,
    AssetRouterInputBasketKeyIdx,
    AssetRouterInputBasketKeyIdEq,
    AssetRouterInputBasketKeyIdxEq,
    AssetRouterInputBasketKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const AssetRouterInputBasketDexieHooks = createCRUDDexieHooks<
    AssetRouterInputBasket,
    AssetRouterInputBasketKeyId,
    AssetRouterInputBasketKeyIdx,
    AssetRouterInputBasketKeyIdEq,
    AssetRouterInputBasketKeyIdxEq,
    AssetRouterInputBasketKeyIdxEqAny
>(AssetRouterInputBasketDexie);
