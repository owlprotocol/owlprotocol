import { createCRUDModel } from "@owlprotocol/crud-redux";
import { AssetRouterInputBasketName } from "./common.js";
import {
    AssetRouterInputBasketId,
    AssetRouterInputBasket,
    validateId,
    validate,
    AssetRouterInputBasketIndexInput,
    toPrimaryKey,
    AssetRouterInputBasketIndexInputAnyOf,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const AssetRouterInputBasketCRUD = createCRUDModel<
    typeof AssetRouterInputBasketName,
    AssetRouterInputBasketId,
    AssetRouterInputBasket,
    Web3ReduxDexie,
    AssetRouterInputBasketIndexInput,
    AssetRouterInputBasketIndexInputAnyOf
>({
    name: AssetRouterInputBasketName,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
    },
});
