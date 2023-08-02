import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { ERC165Abi, ERC165AbiName, validateIdERC165Abi, toPrimaryKeyERC165Abi } from "@owlprotocol/web3-models";
import {
    ERC165AbiKeyId,
    ERC165AbiKeyIdEq,
    ERC165AbiKeyIdx,
    ERC165AbiKeyIdxEq,
    ERC165AbiKeyIdxEqAny,
} from "../../tables/contractmodels/erc165abi.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getERC165AbiDexie() {
    return createCRUDDB<
        typeof ERC165AbiName,
        ERC165Abi,
        ERC165AbiKeyId,
        ERC165AbiKeyIdEq,
        ERC165AbiKeyIdx,
        ERC165AbiKeyIdxEq,
        ERC165AbiKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[ERC165AbiName], {
        validateId: validateIdERC165Abi,
        toPrimaryKey: toPrimaryKeyERC165Abi,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const ERC165AbiDexie = getERC165AbiDexie();
