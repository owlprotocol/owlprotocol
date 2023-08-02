import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { EthBlockCRUDActions } from "@owlprotocol/web3-actions";
import { EthBlockDexie } from "@owlprotocol/web3-dexie";

export const EthBlockCRUDSagas = createCRUDSagas(EthBlockCRUDActions, EthBlockDexie);
