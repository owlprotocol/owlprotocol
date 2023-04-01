import { createCRUDSagas } from "@owlprotocol/crud-sagas";
import { AssetRouterInputBasketCRUDActions } from "@owlprotocol/web3-actions";
import { AssetRouterInputBasketDexie } from "@owlprotocol/web3-dexie";

export const AssetRouterInputBasketCRUDSagas = createCRUDSagas(
    AssetRouterInputBasketCRUDActions,
    AssetRouterInputBasketDexie,
);
