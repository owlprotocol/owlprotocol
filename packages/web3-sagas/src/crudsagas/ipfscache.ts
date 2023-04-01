import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { IPFSCacheCRUDActions } from "@owlprotocol/web3-actions";
import { IPFSCacheDexie } from "@owlprotocol/web3-dexie";

export const IPFSCacheCRUDSagas = createCRUDSagas(IPFSCacheCRUDActions, IPFSCacheDexie);
