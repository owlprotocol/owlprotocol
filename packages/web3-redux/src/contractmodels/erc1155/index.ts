/**
 * @module ERC1155
 */
import { ERC1155CRUD } from "./crud.js";
import { erc1155Saga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const ERC1155 = {
    name: ERC1155CRUD.name,
    actionTypes: ERC1155CRUD.actionTypes,
    actions: {
        ...ERC1155CRUD.actions,
    },
    sagas: {
        ...ERC1155CRUD.sagas,
        rootSaga: erc1155Saga,
    },
    hooks: {
        ...ERC1155CRUD.hooks,
        useERC1155: Hooks.useERC1155,
        useERC1155Where: Hooks.useERC1155Where,
        useERC1155WhereAnyOf: Hooks.useERC1155WhereAnyOf,
    },
    selectors: ERC1155CRUD.selectors,
    isAction: ERC1155CRUD.isAction,
    reducer: ERC1155CRUD.reducer,
    validate: ERC1155CRUD.validate,
    validateId: ERC1155CRUD.validateId,
    validateWithRedux: ERC1155CRUD.validateWithRedux,
    encode: ERC1155CRUD.encode,
};
