import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    EthSendDexie,
    EthSend,
    EthSendKeyId,
    EthSendKeyIdx,
    EthSendKeyIdEq,
    EthSendKeyIdxEq,
    EthSendKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const EthSendDexieHooks = createCRUDDexieHooks<
    EthSend,
    EthSendKeyId,
    EthSendKeyIdx,
    EthSendKeyIdEq,
    EthSendKeyIdxEq,
    EthSendKeyIdxEqAny
>(EthSendDexie);
