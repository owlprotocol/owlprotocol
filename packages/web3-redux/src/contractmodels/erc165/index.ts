/**
 * @module ERC165
 */
import { ERC165CRUD } from "./crud.js";
import { erc165Saga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const ERC165 = {
    name: ERC165CRUD.name,
    actionTypes: ERC165CRUD.actionTypes,
    actions: {
        ...ERC165CRUD.actions,
    },
    sagas: {
        ...ERC165CRUD.sagas,
        rootSaga: erc165Saga,
    },
    hooks: {
        ...ERC165CRUD.hooks,
        useERC165: Hooks.useERC165,
        useERC165Where: Hooks.useERC165Where,
        useERC165WhereAnyOf: Hooks.useERC165WhereAnyOf,
    },
    selectors: ERC165CRUD.selectors,
    isAction: ERC165CRUD.isAction,
    reducer: ERC165CRUD.reducer,
    validate: ERC165CRUD.validate,
    validateId: ERC165CRUD.validateId,
    validateWithRedux: ERC165CRUD.validateWithRedux,
    encode: ERC165CRUD.encode,
};
