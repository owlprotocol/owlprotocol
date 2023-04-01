import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { ERC20AllowanceCRUDActions } from "@owlprotocol/web3-actions";
import { ERC20AllowanceDexie } from "@owlprotocol/web3-dexie";

export const ERC20AllowanceCRUDSagas = createCRUDSagas(ERC20AllowanceCRUDActions, ERC20AllowanceDexie);
