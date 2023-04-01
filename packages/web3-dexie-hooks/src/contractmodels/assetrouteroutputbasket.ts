import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    AssetRouterOutputBasketDexie,
    AssetRouterOutputBasket,
    AssetRouterOutputBasketKeyId,
    AssetRouterOutputBasketKeyIdx,
    AssetRouterOutputBasketKeyIdEq,
    AssetRouterOutputBasketKeyIdxEq,
    AssetRouterOutputBasketKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const AssetRouterOutputBasketDexieHooks = createCRUDDexieHooks<
    AssetRouterOutputBasket,
    AssetRouterOutputBasketKeyId,
    AssetRouterOutputBasketKeyIdx,
    AssetRouterOutputBasketKeyIdEq,
    AssetRouterOutputBasketKeyIdxEq,
    AssetRouterOutputBasketKeyIdxEqAny
>(AssetRouterOutputBasketDexie);
