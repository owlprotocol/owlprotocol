/**
 * @module ERC20Allowance
 */
import { ERC20AllowanceCRUD } from "./crud.js";
import { erc20AllowanceSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const ERC20Allowance = {
    name: ERC20AllowanceCRUD.name,
    actionTypes: ERC20AllowanceCRUD.actionTypes,
    actions: {
        ...ERC20AllowanceCRUD.actions,
    },
    sagas: {
        ...ERC20AllowanceCRUD.sagas,
        rootSaga: erc20AllowanceSaga,
    },
    hooks: {
        ...ERC20AllowanceCRUD.hooks,
        useERC20Allowance: Hooks.useERC20Allowance,
        useERC20AllowanceWhere: Hooks.useERC20AllowanceWhere,
        useERC20AllowanceWhereAnyOf: Hooks.useERC20AllowanceWhereAnyOf,
    },
    selectors: ERC20AllowanceCRUD.selectors,
    isAction: ERC20AllowanceCRUD.isAction,
    reducer: ERC20AllowanceCRUD.reducer,
    validate: ERC20AllowanceCRUD.validate,
    validateId: ERC20AllowanceCRUD.validateId,
    validateWithRedux: ERC20AllowanceCRUD.validateWithRedux,
    encode: ERC20AllowanceCRUD.encode,
};
