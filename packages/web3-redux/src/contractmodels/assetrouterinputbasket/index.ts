/**
 * @module AssetRouterInputBasket
 */
import { AssetRouterInputBasketCRUD } from "./crud.js";
import { assetRouterInputBasketSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const AssetRouterInputBasket = {
    name: AssetRouterInputBasketCRUD.name,
    actionTypes: AssetRouterInputBasketCRUD.actionTypes,
    actions: {
        ...AssetRouterInputBasketCRUD.actions,
    },
    sagas: {
        ...AssetRouterInputBasketCRUD.sagas,
        rootSaga: assetRouterInputBasketSaga,
    },
    hooks: {
        ...AssetRouterInputBasketCRUD.hooks,
        useAssetRouterInputBasket: Hooks.useAssetRouterInputBasket,
    },
    selectors: AssetRouterInputBasketCRUD.selectors,
    isAction: AssetRouterInputBasketCRUD.isAction,
    reducer: AssetRouterInputBasketCRUD.reducer,
    validate: AssetRouterInputBasketCRUD.validate,
    validateId: AssetRouterInputBasketCRUD.validateId,
    validateWithRedux: AssetRouterInputBasketCRUD.validateWithRedux,
    encode: AssetRouterInputBasketCRUD.encode,
};
