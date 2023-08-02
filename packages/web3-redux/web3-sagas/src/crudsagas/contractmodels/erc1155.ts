import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { ERC1155CRUDActions } from "@owlprotocol/web3-actions";
import { ERC1155Dexie } from "@owlprotocol/web3-dexie";

export const ERC1155CRUDSagas = createCRUDSagas(ERC1155CRUDActions, ERC1155Dexie);
