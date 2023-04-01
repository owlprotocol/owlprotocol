import { createCRUDModel } from "@owlprotocol/crud-redux";
import { NetworkName } from "./common.js";
import {
    NetworkId,
    Network,
    validate,
    validateWithRedux,
    encode,
    NetworkWithObjects,
    validateId,
    toPrimaryKey,
    preWriteBulkDB,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../db.js";
import { getOrm } from "../orm.js";

export const NetworkCRUD = createCRUDModel<
    typeof NetworkName,
    NetworkId,
    Network,
    Web3ReduxDexie,
    NetworkId,
    NetworkId,
    Network,
    NetworkWithObjects
>({
    name: NetworkName,
    getDB,
    validators: {
        validateId,
        toPrimaryKey,
        validate,
        validateWithRedux,
        encode,
        preWriteBulkDB,
    },
    orm: getOrm(),
});
