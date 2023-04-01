import { createCRUDDB } from "@owlprotocol/crud-dexie";
import {
    AssetRouterOutputBasket,
    AssetRouterOutputBasketName,
    validateIdAssetRouterOutputBasket,
    toPrimaryKeyAssetRouterOutputBasket,
} from "@owlprotocol/web3-models";
import {
    AssetRouterOutputBasketKeyId,
    AssetRouterOutputBasketKeyIdEq,
    AssetRouterOutputBasketKeyIdx,
    AssetRouterOutputBasketKeyIdxEq,
    AssetRouterOutputBasketKeyIdxEqAny,
} from "../../tables/contractmodels/assetrouteroutputbasket.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getAssetRouterOutputBasketDexie() {
    return createCRUDDB<
        typeof AssetRouterOutputBasketName,
        AssetRouterOutputBasket,
        AssetRouterOutputBasketKeyId,
        AssetRouterOutputBasketKeyIdEq,
        AssetRouterOutputBasketKeyIdx,
        AssetRouterOutputBasketKeyIdxEq,
        AssetRouterOutputBasketKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[AssetRouterOutputBasketName], {
        validateId: validateIdAssetRouterOutputBasket,
        toPrimaryKey: toPrimaryKeyAssetRouterOutputBasket,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const AssetRouterOutputBasketDexie = getAssetRouterOutputBasketDexie();
