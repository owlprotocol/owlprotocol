import { createCRUDModel } from "@owlprotocol/crud-redux";
import { EthLogAbiName } from "./common.js";
import {
    validate,
    validateId,
    toPrimaryKey,
    EthLogAbi,
    EthLogAbiId,
    EthLogAbiIndexInput,
    EthLogAbiPartial,
} from "./model/interface.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const EthLogAbiCRUD = createCRUDModel<
    typeof EthLogAbiName,
    EthLogAbiId,
    EthLogAbi,
    Web3ReduxDexie,
    EthLogAbiIndexInput,
    EthLogAbiIndexInput,
    EthLogAbiPartial
>({
    name: EthLogAbiName,
    getDB,
    validators: {
        validate,
        validateId,
        toPrimaryKey,
    },
});
