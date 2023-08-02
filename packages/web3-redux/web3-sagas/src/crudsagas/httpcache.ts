import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { HTTPCacheCRUDActions } from "@owlprotocol/web3-actions";
import { HTTPCacheDexie } from "@owlprotocol/web3-dexie";

export const HTTPCacheCRUDSagas = createCRUDSagas(HTTPCacheCRUDActions, HTTPCacheDexie);
