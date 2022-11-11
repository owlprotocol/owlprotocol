/**
 * EVM NFTGenerativeItem data module.
 * @module NFTGenerativeItem
 */

import * as Actions from './actions/index.js';
import * as Hooks from './hooks/index.js';
import { NFTGenerativeItemCRUD } from './crud.js';
import { rootSaga } from './sagas/index.js';

export const NFTGenerativeItem = {
    name: NFTGenerativeItemCRUD.name,
    actionTypes: NFTGenerativeItemCRUD.actionTypes,
    actions: {
        ...NFTGenerativeItemCRUD.actions,
        childAttach: Actions.childAttachAction,
    },
    sagas: {
        ...NFTGenerativeItemCRUD.sagas,
        rootSaga,
    },
    hooks: {
        ...NFTGenerativeItemCRUD.hooks,
        useGenerativeItemLocal: Hooks.useGenerativeItemLocal,
        useGenerativeItemOnchain: Hooks.useGenerativeItemOnchain
    },
    selectors: NFTGenerativeItemCRUD.selectors,
    isAction: NFTGenerativeItemCRUD.isAction,
    reducer: NFTGenerativeItemCRUD.reducer,
    validate: NFTGenerativeItemCRUD.validate,
    validateId: NFTGenerativeItemCRUD.validateId,
    hydrate: NFTGenerativeItemCRUD.hydrate,
    encode: NFTGenerativeItemCRUD.encode,
};
