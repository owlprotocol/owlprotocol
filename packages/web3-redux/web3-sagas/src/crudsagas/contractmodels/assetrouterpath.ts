import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { AssetRouterPathCRUDActions } from "@owlprotocol/web3-actions";
import { AssetRouterPathDexie } from "@owlprotocol/web3-dexie";

export const AssetRouterPathCRUDSagas = createCRUDSagas(AssetRouterPathCRUDActions, AssetRouterPathDexie);
