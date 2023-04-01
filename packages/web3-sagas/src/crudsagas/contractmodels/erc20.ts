import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { ERC20CRUDActions } from "@owlprotocol/web3-actions";
import { ERC20Dexie } from "@owlprotocol/web3-dexie";

export const ERC20CRUDSagas = createCRUDSagas(ERC20CRUDActions, ERC20Dexie);
