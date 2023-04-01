import { createCRUDModel } from "@owlprotocol/crud-redux";
import { HTTPCacheName } from "./common.js";
import {
    HTTPCacheId,
    HTTPCache,
    toPrimaryKey,
    validate,
    validateId,
    HTTPCacheIndexInput,
    HTTPCacheIndexInputAnyOf,
    postWriteBulkDB,
} from "./model/index.js";
import { getDB, Web3ReduxDexie } from "../db.js";
import { ContractName } from "../contract/common.js";
import { ERC721Name } from "../contractmodels/erc721/common.js";
import { ERC1155Name } from "../contractmodels/erc1155/common.js";

export const HTTPCacheCRUD = createCRUDModel<
    typeof HTTPCacheName,
    HTTPCacheId,
    HTTPCache,
    Web3ReduxDexie,
    HTTPCacheIndexInput,
    HTTPCacheIndexInputAnyOf
>({
    name: HTTPCacheName,
    getDB,
    validators: {
        validateId,
        toPrimaryKey,
        validate,
        postWriteBulkDB,
    },
    tables: [ContractName, ERC721Name, ERC1155Name],
});
