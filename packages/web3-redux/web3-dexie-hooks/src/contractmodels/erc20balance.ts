import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    ERC20BalanceDexie,
    ERC20Balance,
    ERC20BalanceKeyId,
    ERC20BalanceKeyIdx,
    ERC20BalanceKeyIdEq,
    ERC20BalanceKeyIdxEq,
    ERC20BalanceKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const ERC20BalanceDexieHooks = createCRUDDexieHooks<
    ERC20Balance,
    ERC20BalanceKeyId,
    ERC20BalanceKeyIdx,
    ERC20BalanceKeyIdEq,
    ERC20BalanceKeyIdxEq,
    ERC20BalanceKeyIdxEqAny
>(ERC20BalanceDexie);
