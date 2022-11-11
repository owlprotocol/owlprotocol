/**
 * @module ContractInterface
 */

import * as Actions from './actions/index.js';
import { ContractInterfaceCRUD } from './crud.js';
import { rootSaga } from './sagas/index.js';

export const ContractInterface = {
    name: ContractInterfaceCRUD.name,
    actionTypes: ContractInterfaceCRUD.actionTypes,
    actions: {
        ...ContractInterfaceCRUD.actions,
        getInterfaceImplementer: Actions.getInterfaceImplementer,
        getInterfaceImplementers: Actions.getInterfaceImplementers,
        setIntefaceImplementers: Actions.setInterfaceImplementers,
    },
    sagas: {
        ...ContractInterfaceCRUD.sagas,
        rootSaga,
    },
    hooks: {
        ...ContractInterfaceCRUD.hooks,
    },
    selectors: ContractInterfaceCRUD.selectors,
    isAction: ContractInterfaceCRUD.isAction,
    reducer: ContractInterfaceCRUD.reducer,
    validate: ContractInterfaceCRUD.validate,
    validateId: ContractInterfaceCRUD.validateId,
    hydrate: ContractInterfaceCRUD.hydrate,
    encode: ContractInterfaceCRUD.encode,
};
