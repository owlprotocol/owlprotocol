import { createCRUDDB } from "@owlprotocol/crud-dexie";
import {
    AssetRouterInputBasket,
    AssetRouterInputBasketName,
    validateIdAssetRouterInputBasket,
    toPrimaryKeyAssetRouterInputBasket,
} from "@owlprotocol/web3-models";
import {
    AssetRouterInputBasketKeyId,
    AssetRouterInputBasketKeyIdEq,
    AssetRouterInputBasketKeyIdx,
    AssetRouterInputBasketKeyIdxEq,
    AssetRouterInputBasketKeyIdxEqAny,
} from "../../tables/contractmodels/assetrouterinputbasket.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getAssetRouterInputBasketDexie() {
    return createCRUDDB<
        typeof AssetRouterInputBasketName,
        AssetRouterInputBasket,
        AssetRouterInputBasketKeyId,
        AssetRouterInputBasketKeyIdEq,
        AssetRouterInputBasketKeyIdx,
        AssetRouterInputBasketKeyIdxEq,
        AssetRouterInputBasketKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[AssetRouterInputBasketName], {
        validateId: validateIdAssetRouterInputBasket,
        toPrimaryKey: toPrimaryKeyAssetRouterInputBasket,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const AssetRouterInputBasketDexie = getAssetRouterInputBasketDexie();
