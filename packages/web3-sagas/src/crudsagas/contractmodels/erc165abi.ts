import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { ERC165AbiCRUDActions } from "@owlprotocol/web3-actions";
import { ERC165AbiDexie } from "@owlprotocol/web3-dexie";

export const ERC165AbiCRUDSagas = createCRUDSagas(ERC165AbiCRUDActions, ERC165AbiDexie);
