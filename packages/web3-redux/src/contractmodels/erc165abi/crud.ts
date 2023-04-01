import { createCRUDModel } from "@owlprotocol/crud-redux";
import { ERC165AbiName } from "./common.js";
import { ERC165AbiId, ERC165Abi, validateId, toPrimaryKey } from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../../db.js";

export const ERC165AbiCRUD = createCRUDModel<
    typeof ERC165AbiName,
    ERC165AbiId,
    ERC165Abi,
    Web3ReduxDexie
>({
    name: ERC165AbiName,
    getDB,
    validators: {
        validateId,
        toPrimaryKey,
    },
});
