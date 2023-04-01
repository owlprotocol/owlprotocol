/**
 * Child module
 * Store errors from redux actions
 * @module Error
 */

import { ChildCRUD as CRUDModel } from "./crud.js";
import { ChildIndex } from "./model/index.js";
import { childSaga } from "./sagas/index.js";

export * from "./model/index.js";
export * from "./sagas/index.js";

export const Child = {
    name: CRUDModel.name,
    index: ChildIndex,
    actionTypes: CRUDModel.actionTypes,
    actions: {
        ...CRUDModel.actions,
    },
    sagas: {
        ...CRUDModel.sagas,
        rootSaga: childSaga,
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
    encode: CRUDModel.encode,
};
