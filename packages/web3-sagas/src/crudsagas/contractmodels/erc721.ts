import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { ERC721CRUDActions } from "@owlprotocol/web3-actions";
import { ERC721Dexie } from "@owlprotocol/web3-dexie";

export const ERC721CRUDSagas = createCRUDSagas(ERC721CRUDActions, ERC721Dexie);
