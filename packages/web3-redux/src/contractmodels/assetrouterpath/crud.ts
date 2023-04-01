import { createCRUDModel } from "@owlprotocol/crud-redux";
import { AssetRouterPathName } from "./common.js";
import {
    AssetRouterPathId,
    AssetRouterPath,
    validateId,
    validate,
    AssetRouterPathIndexInput,
    toPrimaryKey,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const AssetRouterPathCRUD = createCRUDModel<
    typeof AssetRouterPathName,
    AssetRouterPathId,
    AssetRouterPath,
    Web3ReduxDexie,
    AssetRouterPathIndexInput,
    AssetRouterPathIndexInput
>({
    name: AssetRouterPathName,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
    },
});
