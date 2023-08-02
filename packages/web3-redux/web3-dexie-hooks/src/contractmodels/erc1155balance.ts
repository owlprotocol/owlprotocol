import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    ERC1155BalanceDexie,
    ERC1155Balance,
    ERC1155BalanceKeyId,
    ERC1155BalanceKeyIdx,
    ERC1155BalanceKeyIdEq,
    ERC1155BalanceKeyIdxEq,
    ERC1155BalanceKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const ERC1155BalanceDexieHooks = createCRUDDexieHooks<
    ERC1155Balance,
    ERC1155BalanceKeyId,
    ERC1155BalanceKeyIdx,
    ERC1155BalanceKeyIdEq,
    ERC1155BalanceKeyIdxEq,
    ERC1155BalanceKeyIdxEqAny
>(ERC1155BalanceDexie);
