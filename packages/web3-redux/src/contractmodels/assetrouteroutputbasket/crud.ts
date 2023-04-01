import { createCRUDModel } from "@owlprotocol/crud-redux";
import { AssetRouterOutputBasketName } from "./common.js";
import {
    AssetRouterOutputBasketId,
    AssetRouterOutputBasket,
    validateId,
    validate,
    AssetRouterOutputBasketIndexInput,
    toPrimaryKey,
    AssetRouterOutputBasketIndexInputAnyOf,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const AssetRouterOutputBasketCRUD = createCRUDModel<
    typeof AssetRouterOutputBasketName,
    AssetRouterOutputBasketId,
    AssetRouterOutputBasket,
    Web3ReduxDexie,
    AssetRouterOutputBasketIndexInput,
    AssetRouterOutputBasketIndexInputAnyOf
>({
    name: AssetRouterOutputBasketName,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
    },
});
