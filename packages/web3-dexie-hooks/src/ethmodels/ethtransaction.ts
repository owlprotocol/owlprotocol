import { createCRUDDexieHooks } from "@owlprotocol/crud-dexie-hooks";
import {
    EthTransactionDexie,
    EthTransaction,
    EthTransactionKeyId,
    EthTransactionKeyIdx,
    EthTransactionKeyIdEq,
    EthTransactionKeyIdxEq,
    EthTransactionKeyIdxEqAny,
} from "@owlprotocol/web3-dexie";

export const EthTransactionDexieHooks = createCRUDDexieHooks<
    EthTransaction,
    EthTransactionKeyId,
    EthTransactionKeyIdx,
    EthTransactionKeyIdEq,
    EthTransactionKeyIdxEq,
    EthTransactionKeyIdxEqAny
>(EthTransactionDexie);
