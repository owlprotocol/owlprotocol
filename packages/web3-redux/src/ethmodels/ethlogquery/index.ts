/**
 * EthLogQuery module
 * Used to cache past event query ranges (eg. blocks 0-100) to avoid
 * re-fetching already cached data.
 * @module EthLogQuery
 */

import { EthLogQueryCRUD } from "./crud.js";
import { ethLogQuerySaga } from "./sagas/index.js";

export const EthLogQuery = {
    name: EthLogQueryCRUD.name,
    actionTypes: EthLogQueryCRUD.actionTypes,
    actions: {
        ...EthLogQueryCRUD.actions,
    },
    sagas: {
        ...EthLogQueryCRUD.sagas,
        rootSaga: ethLogQuerySaga,
    },
    hooks: {
        ...EthLogQueryCRUD.hooks,
    },
    selectors: EthLogQueryCRUD.selectors,
    isAction: EthLogQueryCRUD.isAction,
    reducer: EthLogQueryCRUD.reducer,
    validate: EthLogQueryCRUD.validate,
    validateId: EthLogQueryCRUD.validateId,
    validateWithRedux: EthLogQueryCRUD.validateWithRedux,
    encode: EthLogQueryCRUD.encode,
};
