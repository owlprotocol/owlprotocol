import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { EthLogCRUDActions } from "@owlprotocol/web3-actions";
import { EthLogDexie } from "@owlprotocol/web3-dexie";

export const EthLogCRUDSagas = createCRUDSagas(EthLogCRUDActions, EthLogDexie);
