import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { AssetRouterOutputBasketCRUDActions } from "@owlprotocol/web3-actions";
import { AssetRouterOutputBasketDexie } from "@owlprotocol/web3-dexie";

export const AssetRouterOutputBasketCRUDSagas = createCRUDSagas(
    AssetRouterOutputBasketCRUDActions,
    AssetRouterOutputBasketDexie,
);
