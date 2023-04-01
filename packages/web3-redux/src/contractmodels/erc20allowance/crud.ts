import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ERC20AllowanceName } from "./common.js";
import {
    ERC20AllowanceId,
    ERC20Allowance,
    validateId,
    validate,
    ERC20AllowanceIndexInput,
    toPrimaryKey,
    ERC20AllowanceIndexInputAnyOf,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const ERC20AllowanceCRUD = createCRUDModel<
    typeof ERC20AllowanceName,
    ERC20AllowanceId,
    ERC20Allowance,
    Web3ReduxDexie,
    ERC20AllowanceIndexInput,
    ERC20AllowanceIndexInputAnyOf
>({
    name: ERC20AllowanceName,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
    },
});
