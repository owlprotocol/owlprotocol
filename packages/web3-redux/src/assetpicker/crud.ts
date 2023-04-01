import { createCRUDModel } from "@owlprotocol/crud-redux";
import { AssetPickerName } from "./common.js";
import { AssetPicker, AssetPickerId, toPrimaryKey, validate, validateId } from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../db.js";

export const AssetPickerCRUD = createCRUDModel<typeof AssetPickerName, AssetPickerId, AssetPicker, Web3ReduxDexie>({
    name: AssetPickerName,
    getDB,
    validators: { validate, validateId, toPrimaryKey },
});
