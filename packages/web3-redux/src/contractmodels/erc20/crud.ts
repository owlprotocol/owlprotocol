import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ERC20Name } from "./common.js";
import {
    ERC20Id,
    ERC20,
    validateId,
    validate,
    ERC20IndexInput,
    toPrimaryKey,
    ERC20IndexInputAnyOf,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const ERC20CRUD = createCRUDModel<
    typeof ERC20Name,
    ERC20Id,
    ERC20,
    Web3ReduxDexie,
    ERC20IndexInput,
    ERC20IndexInputAnyOf
>({
    name: ERC20Name,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
    },
});
