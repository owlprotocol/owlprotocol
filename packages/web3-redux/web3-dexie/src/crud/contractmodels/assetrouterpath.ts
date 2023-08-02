import { createCRUDDB } from "@owlprotocol/crud-dexie";
import {
    AssetRouterPath,
    AssetRouterPathName,
    validateIdAssetRouterPath,
    toPrimaryKeyAssetRouterPath,
} from "@owlprotocol/web3-models";
import {
    AssetRouterPathKeyId,
    AssetRouterPathKeyIdEq,
    AssetRouterPathKeyIdx,
    AssetRouterPathKeyIdxEq,
    AssetRouterPathKeyIdxEqAny,
} from "../../tables/contractmodels/assetrouterpath.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getAssetRouterPathDexie() {
    return createCRUDDB<
        typeof AssetRouterPathName,
        AssetRouterPath,
        AssetRouterPathKeyId,
        AssetRouterPathKeyIdEq,
        AssetRouterPathKeyIdx,
        AssetRouterPathKeyIdxEq,
        AssetRouterPathKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[AssetRouterPathName], {
        validateId: validateIdAssetRouterPath,
        toPrimaryKey: toPrimaryKeyAssetRouterPath,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const AssetRouterPathDexie = getAssetRouterPathDexie();
