import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ERC165Name } from "./common.js";
import {
    ERC165Id,
    ERC165,
    validateId,
    validate,
    ERC165IndexInput,
    toPrimaryKey,
    ERC165IndexInputAnyOf,
} from "./model/index.js";
import { postWriteBulkDB } from "./model/postWriteBulkDB.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const ERC165CRUD = createCRUDModel<
    typeof ERC165Name,
    ERC165Id,
    ERC165,
    Web3ReduxDexie,
    ERC165IndexInput,
    ERC165IndexInputAnyOf
>({
    name: ERC165Name,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
        postWriteBulkDB,
    },
});
