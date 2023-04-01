/**
 * @module AssetRouterPath
 */
import { AssetRouterPathCRUD } from "./crud.js";
import { assetRouterPathSaga } from "./sagas/index.js";

export const AssetRouterPath = {
    name: AssetRouterPathCRUD.name,
    actionTypes: AssetRouterPathCRUD.actionTypes,
    actions: {
        ...AssetRouterPathCRUD.actions,
    },
    sagas: {
        ...AssetRouterPathCRUD.sagas,
        rootSaga: assetRouterPathSaga,
    },
    hooks: {
        ...AssetRouterPathCRUD.hooks,
    },
    selectors: AssetRouterPathCRUD.selectors,
    isAction: AssetRouterPathCRUD.isAction,
    reducer: AssetRouterPathCRUD.reducer,
    validate: AssetRouterPathCRUD.validate,
    validateId: AssetRouterPathCRUD.validateId,
    validateWithRedux: AssetRouterPathCRUD.validateWithRedux,
    encode: AssetRouterPathCRUD.encode,
};
