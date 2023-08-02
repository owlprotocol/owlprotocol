import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { EthTransactionCRUDActions } from "@owlprotocol/web3-actions";
import { EthTransactionDexie } from "@owlprotocol/web3-dexie";

export const EthTransactionCRUDSagas = createCRUDSagas(EthTransactionCRUDActions, EthTransactionDexie);
