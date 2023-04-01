import { createCRUDDB } from "@owlprotocol/crud-dexie";
import {
    ERC20Balance,
    ERC20BalanceName,
    validateIdERC20Balance,
    toPrimaryKeyERC20Balance,
} from "@owlprotocol/web3-models";
import {
    ERC20BalanceKeyId,
    ERC20BalanceKeyIdEq,
    ERC20BalanceKeyIdx,
    ERC20BalanceKeyIdxEq,
    ERC20BalanceKeyIdxEqAny,
} from "../../tables/contractmodels/erc20balance.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getERC20BalanceDexie() {
    return createCRUDDB<
        typeof ERC20BalanceName,
        ERC20Balance,
        ERC20BalanceKeyId,
        ERC20BalanceKeyIdEq,
        ERC20BalanceKeyIdx,
        ERC20BalanceKeyIdxEq,
        ERC20BalanceKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[ERC20BalanceName], {
        validateId: validateIdERC20Balance,
        toPrimaryKey: toPrimaryKeyERC20Balance,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const ERC20BalanceDexie = getERC20BalanceDexie();
