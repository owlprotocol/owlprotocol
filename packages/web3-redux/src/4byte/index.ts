/**
 * Store sha-256 preimages queried with https://www.4byte.directory/
 * to be used for identifying Event & Function signatures.
 * @module 4Byte
 *
 */

import CRUDModel from './crud.js';
import { rootSaga } from './sagas/index.js';

export const _4Byte = {
    name: CRUDModel.name,
    actions: {
        ...CRUDModel.actions,
    },
    actionTypes: CRUDModel.actionTypes,
    db: CRUDModel.db,
    hooks: {
        ...CRUDModel.hooks,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga,
    },
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    hydrate: CRUDModel.hydrate,
    encode: CRUDModel.encode,
};

export default _4Byte;
