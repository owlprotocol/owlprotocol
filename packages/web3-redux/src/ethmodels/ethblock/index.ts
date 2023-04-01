/**
 * EVM block data module.
 * @module Block
 */

import * as Actions from "./actions/index.js";
import { BlockCRUD } from "./crud.js";
import { ethBlockSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const Block = {
    name: BlockCRUD.name,
    actionTypes: BlockCRUD.actionTypes,
    actions: {
        ...BlockCRUD.actions,
        fetch: Actions.fetchAction,
        subscribe: Actions.subscribeAction,
        unsubscribe: Actions.unsubscribeAction,
    },
    sagas: {
        ...BlockCRUD.sagas,
        rootSaga: ethBlockSaga,
    },
    hooks: {
        ...BlockCRUD.hooks,
        useBlock: Hooks.useBlock,
        useBlockSync: Hooks.useBlockSync,
    },
    selectors: BlockCRUD.selectors,
    isAction: BlockCRUD.isAction,
    reducer: BlockCRUD.reducer,
    validate: BlockCRUD.validate,
    validateId: BlockCRUD.validateId,
    encode: BlockCRUD.encode,
};
