/**
 * @module ERC165Abi
 */

import { ERC165AbiCRUD } from "./crud.js";
import { contractInterfaceSaga } from "./sagas/index.js";

export const ERC165Abi = {
    name: ERC165AbiCRUD.name,
    actionTypes: ERC165AbiCRUD.actionTypes,
    actions: {
        ...ERC165AbiCRUD.actions,
    },
    sagas: {
        ...ERC165AbiCRUD.sagas,
        rootSaga: contractInterfaceSaga,
    },
    hooks: {
        ...ERC165AbiCRUD.hooks,
    },
    selectors: ERC165AbiCRUD.selectors,
    isAction: ERC165AbiCRUD.isAction,
    reducer: ERC165AbiCRUD.reducer,
    validate: ERC165AbiCRUD.validate,
    validateId: ERC165AbiCRUD.validateId,
    validateWithRedux: ERC165AbiCRUD.validateWithRedux,
    encode: ERC165AbiCRUD.encode,
};
