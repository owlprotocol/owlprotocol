import { createCRUDModel } from "@owlprotocol/crud-redux";
import { EthTransactionName } from "./common.js";
import {
    EthTransactionId,
    EthTransaction,
    validate,
    EthTransactionIndexInput,
    validateId,
    toPrimaryKey,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const EthTransactionCRUD = createCRUDModel<
    typeof EthTransactionName,
    EthTransactionId,
    EthTransaction,
    Web3ReduxDexie,
    EthTransactionIndexInput,
    EthTransactionIndexInput
>({
    name: EthTransactionName,
    getDB,
    validators: { validate, validateId, toPrimaryKey },
});
