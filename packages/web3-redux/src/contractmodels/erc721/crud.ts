import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ERC721Name } from "./common.js";
import {
    ERC721Id,
    ERC721,
    validateId,
    validate,
    ERC721IndexInput,
    toPrimaryKey,
    ERC721IndexInputAnyOf,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const ERC721CRUD = createCRUDModel<
    typeof ERC721Name,
    ERC721Id,
    ERC721,
    Web3ReduxDexie,
    ERC721IndexInput,
    ERC721IndexInputAnyOf
>({
    name: ERC721Name,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
    },
});
