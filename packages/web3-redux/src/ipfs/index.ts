/**
 * IPFS Cache Module
 * Cache data fetched by IPFS HTTP client.
 * @module Ipfs
 */

import * as Actions from "./actions/index.js";
import { IPFSCacheCRUD } from "./crud.js";
import { ipfsCacheSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const IPFSCache = {
    name: IPFSCacheCRUD.name,
    actionTypes: IPFSCacheCRUD.actionTypes,
    actions: {
        ...IPFSCacheCRUD.actions,
        add: Actions.add,
        addAll: Actions.addAll,
        cat: Actions.catAction,
        ls: Actions.ls,
    },
    sagas: {
        ...IPFSCacheCRUD.sagas,
        rootSaga: ipfsCacheSaga,
    },
    hooks: {
        ...IPFSCacheCRUD.hooks,
        useIpfs: Hooks.useIpfs,
        useURI: Hooks.useURI,
        useAtPath: Hooks.useAtPath,
    },
    selectors: IPFSCacheCRUD.selectors,
    isAction: IPFSCacheCRUD.isAction,
    reducer: IPFSCacheCRUD.reducer,
    validate: IPFSCacheCRUD.validate,
    validateId: IPFSCacheCRUD.validateId,
    validateWithRedux: IPFSCacheCRUD.validateWithRedux,
    encode: IPFSCacheCRUD.encode,
};
