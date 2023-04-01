import { createCRUDModel } from "@owlprotocol/crud-redux";
import { IPFSCacheName } from "./common.js";
import { validateId, toPrimaryKey, IpfsId, Ipfs, IpfsIndexInput, IpfsIndexInputAnyOf } from "./model/interface.js";
import { postWriteBulkDB } from "./model/postWriteBulkDB.js";
import { getDB, Web3ReduxDexie } from "../db.js";
import { ContractName } from "../contract/common.js";
import { ERC721Name } from "../contractmodels/erc721/common.js";
import { ERC1155Name } from "../contractmodels/erc1155/common.js";

export const IPFSCacheCRUD = createCRUDModel<
    typeof IPFSCacheName,
    IpfsId,
    Ipfs,
    Web3ReduxDexie,
    IpfsIndexInput,
    IpfsIndexInputAnyOf
>({
    name: IPFSCacheName,
    getDB,
    validators: {
        validateId,
        toPrimaryKey,
        postWriteBulkDB,
    },
    tables: [ContractName, ERC721Name, ERC1155Name],
});
