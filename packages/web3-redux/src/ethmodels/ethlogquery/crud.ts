import { createCRUDModel } from "@owlprotocol/crud-redux";
import { EthLogQueryName } from "./common.js";
import {
    EthLogQueryId,
    EthLogQuery,
    validateEthLogQuery,
    EthLogQueryIndexInput,
    validateId,
    toPrimaryKey,
    EthLogQueryPartial,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const EthLogQueryCRUD = createCRUDModel<
    typeof EthLogQueryName,
    EthLogQueryId,
    EthLogQuery,
    Web3ReduxDexie,
    EthLogQueryIndexInput,
    EthLogQueryIndexInput,
    EthLogQueryPartial
>({
    name: EthLogQueryName,
    getDB,
    validators: { validate: validateEthLogQuery, validateId, toPrimaryKey },
});
