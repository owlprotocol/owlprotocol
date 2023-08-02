import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { EthLogAbiCRUDActions } from "@owlprotocol/web3-actions";
import { EthLogAbiDexie } from "@owlprotocol/web3-dexie";

export const EthLogAbiCRUDSagas = createCRUDSagas(EthLogAbiCRUDActions, EthLogAbiDexie);
