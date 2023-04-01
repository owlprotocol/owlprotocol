import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { ContractCRUDActions } from "@owlprotocol/web3-actions";
import { ContractDexie } from "@owlprotocol/web3-dexie";

export const ContractCRUDSagas = createCRUDSagas(ContractCRUDActions, ContractDexie);
