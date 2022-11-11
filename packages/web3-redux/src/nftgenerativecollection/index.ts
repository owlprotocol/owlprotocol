/**
 * EVM NFTGenerativeCollection data module.
 * @module NFTGenerativeCollection
 */

import * as Hooks from './hooks/index.js'
import { NFTGenerativeCollectionCRUD } from './crud.js';
import { rootSaga } from './sagas/index.js';

export const NFTGenerativeCollection = {
    name: NFTGenerativeCollectionCRUD.name,
    actionTypes: NFTGenerativeCollectionCRUD.actionTypes,
    actions: {
        ...NFTGenerativeCollectionCRUD.actions,
    },
    sagas: {
        ...NFTGenerativeCollectionCRUD.sagas,
        rootSaga,
    },
    hooks: {
        ...NFTGenerativeCollectionCRUD.hooks,
        useGenerativeCollection: Hooks.useGenerativeCollection
    },
    selectors: NFTGenerativeCollectionCRUD.selectors,
    isAction: NFTGenerativeCollectionCRUD.isAction,
    reducer: NFTGenerativeCollectionCRUD.reducer,
    validate: NFTGenerativeCollectionCRUD.validate,
    validateId: NFTGenerativeCollectionCRUD.validateId,
    hydrate: NFTGenerativeCollectionCRUD.hydrate,
    encode: NFTGenerativeCollectionCRUD.encode,
};
