import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    ERC1155Dexie,
    ERC1155,
    ERC1155KeyId,
    ERC1155KeyIdx,
    ERC1155KeyIdEq,
    ERC1155KeyIdxEq,
    ERC1155KeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const ERC1155DexieHooks = createCRUDDexieHooks<
    ERC1155,
    ERC1155KeyId,
    ERC1155KeyIdx,
    ERC1155KeyIdEq,
    ERC1155KeyIdxEq,
    ERC1155KeyIdxEqAny
>(ERC1155Dexie);
