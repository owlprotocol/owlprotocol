import { createCRUDDB } from "@owlprotocol/crud-dexie";
import { ERC20, ERC20Name, validateIdERC20, toPrimaryKeyERC20 } from "@owlprotocol/web3-models";
import {
    ERC20KeyId,
    ERC20KeyIdEq,
    ERC20KeyIdx,
    ERC20KeyIdxEq,
    ERC20KeyIdxEqAny,
} from "../../tables/contractmodels/erc20.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getERC20Dexie() {
    return createCRUDDB<
        typeof ERC20Name,
        ERC20,
        ERC20KeyId,
        ERC20KeyIdEq,
        ERC20KeyIdx,
        ERC20KeyIdxEq,
        ERC20KeyIdxEqAny
    >(Web3Dexie, Web3Dexie[ERC20Name], {
        validateId: validateIdERC20,
        toPrimaryKey: toPrimaryKeyERC20,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const ERC20Dexie = getERC20Dexie();
