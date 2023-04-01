import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    ContractDexie,
    Contract,
    ContractKeyId,
    ContractKeyIdx,
    ContractKeyIdEq,
    ContractKeyIdxEq,
    ContractKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const ContractDexieHooks = createCRUDDexieHooks<
    Contract,
    ContractKeyId,
    ContractKeyIdx,
    ContractKeyIdEq,
    ContractKeyIdxEq,
    ContractKeyIdxEqAny
>(ContractDexie);
