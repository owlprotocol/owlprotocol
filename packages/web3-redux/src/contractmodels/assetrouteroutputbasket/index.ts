/**
 * @module AssetRouterOutputBasket
 */
import { AssetRouterOutputBasketCRUD } from "./crud.js";
import { assetRouterOuputBasketSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const AssetRouterOutputBasket = {
    name: AssetRouterOutputBasketCRUD.name,
    actionTypes: AssetRouterOutputBasketCRUD.actionTypes,
    actions: {
        ...AssetRouterOutputBasketCRUD.actions,
    },
    sagas: {
        ...AssetRouterOutputBasketCRUD.sagas,
        rootSaga: assetRouterOuputBasketSaga,
    },
    hooks: {
        ...AssetRouterOutputBasketCRUD.hooks,
        useAssetRouterOutputBasket: Hooks.useAssetRouterOutputBasket,
    },
    selectors: AssetRouterOutputBasketCRUD.selectors,
    isAction: AssetRouterOutputBasketCRUD.isAction,
    reducer: AssetRouterOutputBasketCRUD.reducer,
    validate: AssetRouterOutputBasketCRUD.validate,
    validateId: AssetRouterOutputBasketCRUD.validateId,
    validateWithRedux: AssetRouterOutputBasketCRUD.validateWithRedux,
    encode: AssetRouterOutputBasketCRUD.encode,
};
