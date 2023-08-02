import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { ERC1155, ERC1155Name, validateIdERC1155, toPrimaryKeyERC1155 } from "@owlprotocol/web3-models";
import {
    ERC1155KeyId,
    ERC1155KeyIdEq,
    ERC1155KeyIdx,
    ERC1155KeyIdxEq,
    ERC1155KeyIdxEqAny,
} from "../../tables/contractmodels/erc1155.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getERC1155Dexie() {
    return createCRUDDB<
        typeof ERC1155Name,
        ERC1155,
        ERC1155KeyId,
        ERC1155KeyIdEq,
        ERC1155KeyIdx,
        ERC1155KeyIdxEq,
        ERC1155KeyIdxEqAny
    >(Web3Dexie, Web3Dexie[ERC1155Name], {
        validateId: validateIdERC1155,
        toPrimaryKey: toPrimaryKeyERC1155,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const ERC1155Dexie = getERC1155Dexie();
