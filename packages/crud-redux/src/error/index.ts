/**
 * ReduxError module
 * Store errors from redux actions
 * @module Error
 */

import { ReduxErrorCRUD as CRUDModel } from './crud.js';
import { ReduxErrorIndex } from './model/index.js'
import { rootSaga } from './sagas/index.js';

export * from './model/index.js'
export * from './sagas/index.js'

export const ReduxError = {
    name: CRUDModel.name,
    index: ReduxErrorIndex,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    hooks: {
        ...CRUDModel.hooks,
    },
    db: CRUDModel.db,
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    hydrate: CRUDModel.hydrate,
    encode: CRUDModel.encode,
};
