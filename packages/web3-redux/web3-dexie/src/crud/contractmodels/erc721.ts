import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { ERC721, ERC721Name, validateIdERC721, toPrimaryKeyERC721 } from "@owlprotocol/web3-models";
import {
    ERC721KeyId,
    ERC721KeyIdEq,
    ERC721KeyIdx,
    ERC721KeyIdxEq,
    ERC721KeyIdxEqAny,
} from "../../tables/contractmodels/erc721.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getERC721Dexie() {
    return createCRUDDB<
        typeof ERC721Name,
        ERC721,
        ERC721KeyId,
        ERC721KeyIdEq,
        ERC721KeyIdx,
        ERC721KeyIdxEq,
        ERC721KeyIdxEqAny
    >(Web3Dexie, Web3Dexie[ERC721Name], {
        validateId: validateIdERC721,
        toPrimaryKey: toPrimaryKeyERC721,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const ERC721Dexie = getERC721Dexie();
