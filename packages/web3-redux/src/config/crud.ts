import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ConfigName } from "./common.js";
import {
    ConfigId,
    Config,
    ConfigWithObjects,
    encode,
    toPrimaryKey,
    validateId,
    validate,
    validateWithRedux,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../db.js";
import { getOrm } from "../orm.js";

export const ConfigCRUD = createCRUDModel<
    typeof ConfigName,
    ConfigId,
    Config,
    Web3ReduxDexie,
    ConfigId,
    ConfigId,
    Config,
    ConfigWithObjects
>({
    name: ConfigName,
    getDB,
    validators: {
        encode,
        validateId,
        toPrimaryKey,
        validate,
        validateWithRedux,
    },
    orm: getOrm(),
});
