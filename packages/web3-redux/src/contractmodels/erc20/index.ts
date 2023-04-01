/**
 * @module ERC20
 */
import { ERC20CRUD } from "./crud.js";
import { erc20Saga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const ERC20 = {
    name: ERC20CRUD.name,
    actionTypes: ERC20CRUD.actionTypes,
    actions: {
        ...ERC20CRUD.actions,
    },
    sagas: {
        ...ERC20CRUD.sagas,
        rootSaga: erc20Saga,
    },
    hooks: {
        ...ERC20CRUD.hooks,
        useERC20: Hooks.useERC20,
        useERC20Where: Hooks.useERC20Where,
        useERC20WhereAnyOf: Hooks.useERC20WhereAnyOf,
    },
    selectors: ERC20CRUD.selectors,
    isAction: ERC20CRUD.isAction,
    reducer: ERC20CRUD.reducer,
    validate: ERC20CRUD.validate,
    validateId: ERC20CRUD.validateId,
    validateWithRedux: ERC20CRUD.validateWithRedux,
    encode: ERC20CRUD.encode,
};
