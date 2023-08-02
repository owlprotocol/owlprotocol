import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    ERC20AllowanceDexie,
    ERC20Allowance,
    ERC20AllowanceKeyId,
    ERC20AllowanceKeyIdx,
    ERC20AllowanceKeyIdEq,
    ERC20AllowanceKeyIdxEq,
    ERC20AllowanceKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const ERC20AllowanceDexieHooks = createCRUDDexieHooks<
    ERC20Allowance,
    ERC20AllowanceKeyId,
    ERC20AllowanceKeyIdx,
    ERC20AllowanceKeyIdEq,
    ERC20AllowanceKeyIdxEq,
    ERC20AllowanceKeyIdxEqAny
>(ERC20AllowanceDexie);
