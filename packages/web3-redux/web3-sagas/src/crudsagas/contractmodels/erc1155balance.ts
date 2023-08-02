import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { ERC1155BalanceCRUDActions } from "@owlprotocol/web3-actions";
import { ERC1155BalanceDexie } from "@owlprotocol/web3-dexie";

export const ERC1155BalanceCRUDSagas = createCRUDSagas(ERC1155BalanceCRUDActions, ERC1155BalanceDexie);
