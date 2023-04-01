import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { ConfigCRUDActions } from "@owlprotocol/web3-actions";
import { ConfigDexie } from "@owlprotocol/web3-dexie";

export const ConfigCRUDSagas = createCRUDSagas(ConfigCRUDActions, ConfigDexie);
