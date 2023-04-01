import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { EthCallAbiCRUDActions } from "@owlprotocol/web3-actions";
import { EthCallAbiDexie } from "@owlprotocol/web3-dexie";

export const EthCallAbiCRUDSagas = createCRUDSagas(EthCallAbiCRUDActions, EthCallAbiDexie);
