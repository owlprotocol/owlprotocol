import { createCRUDModel } from "@owlprotocol/crud-redux";
import { EthCallAbiName } from "./common.js";
import {
    validate,
    validateId,
    toPrimaryKey,
    EthCallAbi,
    EthCallAbiId,
    EthCallAbiIndexInput,
    EthCallAbiPartial,
} from "./model/interface.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const EthCallAbiCRUD = createCRUDModel<
    typeof EthCallAbiName,
    EthCallAbiId,
    EthCallAbi,
    Web3ReduxDexie,
    EthCallAbiIndexInput,
    EthCallAbiIndexInput,
    EthCallAbiPartial
>({
    name: EthCallAbiName,
    getDB,
    validators: {
        validate,
        validateId,
        toPrimaryKey,
    },
});
