import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { EthLogSubscribeCRUDActions } from "@owlprotocol/web3-actions";
import { EthLogSubscribeDexie } from "@owlprotocol/web3-dexie";

export const EthLogSubscribeCRUDSagas = createCRUDSagas(EthLogSubscribeCRUDActions, EthLogSubscribeDexie);
