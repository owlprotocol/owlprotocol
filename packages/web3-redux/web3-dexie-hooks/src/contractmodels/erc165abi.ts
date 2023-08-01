import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    ERC165AbiDexie,
    ERC165Abi,
    ERC165AbiKeyId,
    ERC165AbiKeyIdx,
    ERC165AbiKeyIdEq,
    ERC165AbiKeyIdxEq,
    ERC165AbiKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const ERC165AbiDexieHooks = createCRUDDexieHooks<
    ERC165Abi,
    ERC165AbiKeyId,
    ERC165AbiKeyIdx,
    ERC165AbiKeyIdEq,
    ERC165AbiKeyIdxEq,
    ERC165AbiKeyIdxEqAny
>(ERC165AbiDexie);
