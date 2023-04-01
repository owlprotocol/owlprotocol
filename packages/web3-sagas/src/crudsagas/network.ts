import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { NetworkCRUDActions } from "@owlprotocol/web3-actions";
import { NetworkDexie } from "@owlprotocol/web3-dexie";

export const NetworkCRUDSagas = createCRUDSagas(NetworkCRUDActions, NetworkDexie);
