/**
 * @module CointractEventSubscribe
 *
 */

import { EthLogSubscribeCRUD as CRUDModel } from "./crud.js";

export const EthLogSubscribe = {
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
    },
    selectors: CRUDModel.selectors,
    isAction: CRUDModel.isAction,
    reducer: CRUDModel.reducer,
    validate: CRUDModel.validate,
    validateId: CRUDModel.validateId,
    validateWithRedux: CRUDModel.validateWithRedux,
    encode: CRUDModel.encode,
};
