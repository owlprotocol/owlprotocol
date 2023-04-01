/**
 * @module ERC1155Balance
 */
import { ERC1155BalanceCRUD } from "./crud.js";
import { erc1155BalanceSaga } from "./sagas/index.js";
import * as Hooks from "./hooks/index.js";

export const ERC1155Balance = {
    name: ERC1155BalanceCRUD.name,
    actionTypes: ERC1155BalanceCRUD.actionTypes,
    actions: {
        ...ERC1155BalanceCRUD.actions,
    },
    sagas: {
        ...ERC1155BalanceCRUD.sagas,
        rootSaga: erc1155BalanceSaga,
    },
    hooks: {
        ...ERC1155BalanceCRUD.hooks,
        useERC1155Balance: Hooks.useERC1155Balance,
    },
    selectors: ERC1155BalanceCRUD.selectors,
    isAction: ERC1155BalanceCRUD.isAction,
    reducer: ERC1155BalanceCRUD.reducer,
    validate: ERC1155BalanceCRUD.validate,
    validateId: ERC1155BalanceCRUD.validateId,
    validateWithRedux: ERC1155BalanceCRUD.validateWithRedux,
    encode: ERC1155BalanceCRUD.encode,
};
