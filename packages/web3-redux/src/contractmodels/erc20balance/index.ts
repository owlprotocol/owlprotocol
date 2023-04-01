/**
 * @module ERC20Balance
 */
import { ERC20BalanceCRUD } from "./crud.js";
import { erc20BalanceSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const ERC20Balance = {
    name: ERC20BalanceCRUD.name,
    actionTypes: ERC20BalanceCRUD.actionTypes,
    actions: {
        ...ERC20BalanceCRUD.actions,
    },
    sagas: {
        ...ERC20BalanceCRUD.sagas,
        rootSaga: erc20BalanceSaga,
    },
    hooks: {
        ...ERC20BalanceCRUD.hooks,
        useERC20Balance: Hooks.useERC20Balance,
        useERC20BalanceWhere: Hooks.useERC20BalanceWhere,
        useERC20BalanceWhereAnyOf: Hooks.useERC20BalanceWhereAnyOf,
    },
    selectors: ERC20BalanceCRUD.selectors,
    isAction: ERC20BalanceCRUD.isAction,
    reducer: ERC20BalanceCRUD.reducer,
    validate: ERC20BalanceCRUD.validate,
    validateId: ERC20BalanceCRUD.validateId,
    validateWithRedux: ERC20BalanceCRUD.validateWithRedux,
    encode: ERC20BalanceCRUD.encode,
};
