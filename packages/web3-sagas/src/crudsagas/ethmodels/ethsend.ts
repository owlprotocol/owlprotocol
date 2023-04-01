import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { EthSendCRUDActions } from "@owlprotocol/web3-actions";
import { EthSendDexie } from "@owlprotocol/web3-dexie";

export const EthSendCRUDSagas = createCRUDSagas(EthSendCRUDActions, EthSendDexie);
