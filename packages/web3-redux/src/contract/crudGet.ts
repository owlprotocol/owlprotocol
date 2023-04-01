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
import { getDB, Web3ReduxDexie } from "../db.js";

//Avoid circular dependencies, no postWriteHook
export function getContractCRUD() {
    return createCRUDModel<
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
        },
        tables: [],
    });
}
