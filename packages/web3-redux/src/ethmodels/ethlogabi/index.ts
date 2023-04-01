/**
 * Store EthLog ABIs queried with https://www.4byte.directory/
 * to be used for identifying Event signatures.
 * @module EthLogAbi
 *
 */

import { EthLogAbiCRUD as CRUDModel } from "./crud.js";
import { ethLogAbiSaga } from "./sagas/index.js";

export const EthLogAbi = {
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
        rootSaga: ethLogAbiSaga,
    },
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    encode: CRUDModel.encode,
};
