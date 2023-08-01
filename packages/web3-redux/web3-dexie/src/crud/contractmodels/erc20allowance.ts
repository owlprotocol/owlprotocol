import { createCRUDDB } from "@owlprotocol/crud-dexie";
import {
    ERC20Allowance,
    ERC20AllowanceName,
    validateIdERC20Allowance,
    toPrimaryKeyERC20Allowance,
} from "@owlprotocol/web3-models";
import {
    ERC20AllowanceKeyId,
    ERC20AllowanceKeyIdEq,
    ERC20AllowanceKeyIdx,
    ERC20AllowanceKeyIdxEq,
    ERC20AllowanceKeyIdxEqAny,
} from "../../tables/contractmodels/erc20allowance.js";
import { Web3Dexie } from "../../dbIndex.js";

export function getERC20AllowanceDexie() {
    return createCRUDDB<
        typeof ERC20AllowanceName,
        ERC20Allowance,
        ERC20AllowanceKeyId,
        ERC20AllowanceKeyIdEq,
        ERC20AllowanceKeyIdx,
        ERC20AllowanceKeyIdxEq,
        ERC20AllowanceKeyIdxEqAny
    >(Web3Dexie, Web3Dexie[ERC20AllowanceName], {
        validateId: validateIdERC20Allowance,
        toPrimaryKey: toPrimaryKeyERC20Allowance,
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
export const ERC20AllowanceDexie = getERC20AllowanceDexie();
