/**
 * IPFS Cache Module
 * Cache data fetched by IPFS HTTP client.
 * @module Ipfs
 */

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import { rootSaga } from './sagas/index.js';
import * as Hooks from './hooks/index.js';

export const IPFSCache = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
        add: Actions.add,
        addAll: Actions.addAll,
        cat: Actions.catAction,
        ls: Actions.ls,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
        useCat: Hooks.useCat,
        useIpfs: Hooks.useIpfs,
        useURI: Hooks.useURI,
        useAtPath: Hooks.useAtPath,
    },
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    hydrate: CRUDModel.hydrate,
    encode: CRUDModel.encode,
};

export default IPFSCache;
