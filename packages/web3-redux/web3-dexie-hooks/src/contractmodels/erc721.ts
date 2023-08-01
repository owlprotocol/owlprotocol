import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    ERC721Dexie,
    ERC721,
    ERC721KeyId,
    ERC721KeyIdx,
    ERC721KeyIdEq,
    ERC721KeyIdxEq,
    ERC721KeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const ERC721DexieHooks = createCRUDDexieHooks<
    ERC721,
    ERC721KeyId,
    ERC721KeyIdx,
    ERC721KeyIdEq,
    ERC721KeyIdxEq,
    ERC721KeyIdxEqAny
>(ERC721Dexie);
