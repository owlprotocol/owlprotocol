import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    ERC165Dexie,
    ERC165,
    ERC165KeyId,
    ERC165KeyIdx,
    ERC165KeyIdEq,
    ERC165KeyIdxEq,
    ERC165KeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const ERC165DexieHooks = createCRUDDexieHooks<
    ERC165,
    ERC165KeyId,
    ERC165KeyIdx,
    ERC165KeyIdEq,
    ERC165KeyIdxEq,
    ERC165KeyIdxEqAny
>(ERC165Dexie);
