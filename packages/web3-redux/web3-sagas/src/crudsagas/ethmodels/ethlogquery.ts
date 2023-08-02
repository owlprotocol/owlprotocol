import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { EthLogQueryCRUDActions } from "@owlprotocol/web3-actions";
import { EthLogQueryDexie } from "@owlprotocol/web3-dexie";

export const EthLogQueryCRUDSagas = createCRUDSagas(EthLogQueryCRUDActions, EthLogQueryDexie);
