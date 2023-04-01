/**
 * Comments on Sync module
 * @module Sync
 */

import { SyncCRUD } from "./crud.js";
import { syncSaga } from "./sagas/index.js";

export const Sync = {
    name: SyncCRUD.name,
    actionTypes: SyncCRUD.actionTypes,
    actions: {
        ...SyncCRUD.actions,
    },
    sagas: {
        ...SyncCRUD.sagas,
        rootSaga: syncSaga,
    },
    hooks: {
        ...SyncCRUD.hooks,
    },
    selectors: SyncCRUD.selectors,
    isAction: SyncCRUD.isAction,
    reducer: SyncCRUD.reducer,
    validate: SyncCRUD.validate,
    validateId: SyncCRUD.validateId,
    validateWithRedux: SyncCRUD.validateWithRedux,
    encode: SyncCRUD.encode,
};
