import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    ERC20Dexie,
    ERC20,
    ERC20KeyId,
    ERC20KeyIdx,
    ERC20KeyIdEq,
    ERC20KeyIdxEq,
    ERC20KeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const ERC20DexieHooks = createCRUDDexieHooks<
    ERC20,
    ERC20KeyId,
    ERC20KeyIdx,
    ERC20KeyIdEq,
    ERC20KeyIdxEq,
    ERC20KeyIdxEqAny
>(ERC20Dexie);
