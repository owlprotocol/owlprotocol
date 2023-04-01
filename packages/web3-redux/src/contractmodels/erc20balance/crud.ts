import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ERC20BalanceName } from "./common.js";
import {
    ERC20BalanceId,
    ERC20Balance,
    validateId,
    validate,
    ERC20BalanceIndexInput,
    toPrimaryKey,
    ERC20BalanceIndexInputAnyOf,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const ERC20BalanceCRUD = createCRUDModel<
    typeof ERC20BalanceName,
    ERC20BalanceId,
    ERC20Balance,
    Web3ReduxDexie,
    ERC20BalanceIndexInput,
    ERC20BalanceIndexInputAnyOf
>({
    name: ERC20BalanceName,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
    },
});
