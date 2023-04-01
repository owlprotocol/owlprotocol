import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ERC1155BalanceName } from "./common.js";
import {
    ERC1155BalanceId,
    ERC1155Balance,
    validateId,
    validate,
    ERC1155BalanceIndexInput,
    toPrimaryKey,
    ERC1155BalanceIndexInputAnyOf,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const ERC1155BalanceCRUD = createCRUDModel<
    typeof ERC1155BalanceName,
    ERC1155BalanceId,
    ERC1155Balance,
    Web3ReduxDexie,
    ERC1155BalanceIndexInput,
    ERC1155BalanceIndexInputAnyOf
>({
    name: ERC1155BalanceName,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
    },
});
