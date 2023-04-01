import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    EthCallAbiDexie,
    EthCallAbi,
    EthCallAbiKeyId,
    EthCallAbiKeyIdx,
    EthCallAbiKeyIdEq,
    EthCallAbiKeyIdxEq,
    EthCallAbiKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const EthCallAbiDexieHooks = createCRUDDexieHooks<
    EthCallAbi,
    EthCallAbiKeyId,
    EthCallAbiKeyIdx,
    EthCallAbiKeyIdEq,
    EthCallAbiKeyIdxEq,
    EthCallAbiKeyIdxEqAny
>(EthCallAbiDexie);
