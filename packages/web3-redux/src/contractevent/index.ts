/**
 * ContractEvent module
 * Used to sync past events and subscribe to contract updates.
 * Efficiently stored in IndexedDB to enable optimal querying in the cache.
 * @module ContractEvent
 */

import * as Actions from './actions/index.js';
import CRUDModel from './crud.js';
import { rootSaga } from './sagas/index.js';

export const ContractEvent = {
    name: CRUDModel.name,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
        getAssets: Actions.getAssets,
        getPastLogs: Actions.getPastLogs,
        subscribeLogs: Actions.subscribeLogs,
        unsubscribeLogs: Actions.unsubscribeLogs,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
    },
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    hydrate: CRUDModel.hydrate,
    encode: CRUDModel.encode,
};

export default ContractEvent;
