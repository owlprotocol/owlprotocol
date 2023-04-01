import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ERC1155Name } from "./common.js";
import {
    ERC1155Id,
    ERC1155,
    validateId,
    validate,
    ERC1155IndexInput,
    toPrimaryKey,
    ERC1155IndexInputAnyOf,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const ERC1155CRUD = createCRUDModel<
    typeof ERC1155Name,
    ERC1155Id,
    ERC1155,
    Web3ReduxDexie,
    ERC1155IndexInput,
    ERC1155IndexInputAnyOf
>({
    name: ERC1155Name,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
    },
});
