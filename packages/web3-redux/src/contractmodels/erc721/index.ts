/**
 * @module ERC721
 */
import { ERC721CRUD } from "./crud.js";
import { erc721Saga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const ERC721 = {
    name: ERC721CRUD.name,
    actionTypes: ERC721CRUD.actionTypes,
    actions: {
        ...ERC721CRUD.actions,
    },
    sagas: {
        ...ERC721CRUD.sagas,
        rootSaga: erc721Saga,
    },
    hooks: {
        ...ERC721CRUD.hooks,
        useERC721: Hooks.useERC721,
        useERC721Where: Hooks.useERC721Where,
        useERC721WhereAnyOf: Hooks.useERC721WhereAnyOf,
    },
    selectors: ERC721CRUD.selectors,
    isAction: ERC721CRUD.isAction,
    reducer: ERC721CRUD.reducer,
    validate: ERC721CRUD.validate,
    validateId: ERC721CRUD.validateId,
    validateWithRedux: ERC721CRUD.validateWithRedux,
    encode: ERC721CRUD.encode,
};
