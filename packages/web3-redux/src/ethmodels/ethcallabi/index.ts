/**
 * Store EthLog ABIs queried with https://www.4byte.directory/
 * to be used for identifying Function signatures.
 * @module EthCallAbi
 *
 */

import { EthCallAbiCRUD as CRUDModel } from "./crud.js";
import { ethCallAbiSaga } from "./sagas/index.js";

export const EthCallAbi = {
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
        rootSaga: ethCallAbiSaga,
    },
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    encode: CRUDModel.encode,
};
