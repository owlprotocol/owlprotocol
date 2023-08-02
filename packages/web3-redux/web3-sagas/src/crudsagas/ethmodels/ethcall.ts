import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { EthCallCRUDActions } from "@owlprotocol/web3-actions";
import { EthCallDexie } from "@owlprotocol/web3-dexie";

export const EthCallCRUDSagas = createCRUDSagas(EthCallCRUDActions, EthCallDexie);
