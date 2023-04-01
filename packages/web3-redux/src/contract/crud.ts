import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ContractName } from "./common.js";
import {
    ContractId,
    Contract,
    validateId,
    validate,
    ContractIndexInput,
    toPrimaryKey,
    ContractIndexInputAnyOf,
} from "./model/index.js";
import { postWriteBulkDB } from "./model/postWriteBulkDB.js";
import { getDB, Web3ReduxDexie } from "../db.js";
import { EthLogName } from "../ethmodels/ethlog/common.js";

export const ContractCRUD = createCRUDModel<
    typeof ContractName,
    ContractId,
    Contract,
    Web3ReduxDexie,
    ContractIndexInput,
    ContractIndexInputAnyOf
>({
    name: ContractName,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
        postWriteBulkDB,
    },
    tables: [EthLogName],
});
