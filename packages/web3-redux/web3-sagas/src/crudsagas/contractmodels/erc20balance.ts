import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { ERC20BalanceCRUDActions } from "@owlprotocol/web3-actions";
import { ERC20BalanceDexie } from "@owlprotocol/web3-dexie";

export const ERC20BalanceCRUDSagas = createCRUDSagas(ERC20BalanceCRUDActions, ERC20BalanceDexie);
