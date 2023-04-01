import { createCRUDDB } from "@owlprotocol/crud-dexie";
import {
    ERC1155Balance,
    ERC1155BalanceName,
    validateIdERC1155Balance,
    toPrimaryKeyERC1155Balance,
} from "@owlprotocol/web3-models";
import {
    ERC1155BalanceKeyId,
    ERC1155BalanceKeyIdEq,
    ERC1155BalanceKeyIdx,
    ERC1155BalanceKeyIdxEq,
    ERC1155BalanceKeyIdxEqAny,
} from "../../tables/contractmodels/erc1155balance.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getERC1155BalanceDexie() {
    return createCRUDDB<
        typeof ERC1155BalanceName,
        ERC1155Balance,
        ERC1155BalanceKeyId,
        ERC1155BalanceKeyIdEq,
        ERC1155BalanceKeyIdx,
        ERC1155BalanceKeyIdxEq,
        ERC1155BalanceKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[ERC1155BalanceName], {
        validateId: validateIdERC1155Balance,
        toPrimaryKey: toPrimaryKeyERC1155Balance,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const ERC1155BalanceDexie = getERC1155BalanceDexie();
