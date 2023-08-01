import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { ERC165CRUDActions } from "@owlprotocol/web3-actions";
import { ERC165Dexie } from "@owlprotocol/web3-dexie";

export const ERC165CRUDSagas = createCRUDSagas(ERC165CRUDActions, ERC165Dexie);
