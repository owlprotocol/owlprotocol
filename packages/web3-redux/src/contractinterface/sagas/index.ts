import { all, spawn, takeEvery } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'

import { getInterfaceImplementers } from './getInterfaceImplementers.js';
import { setInterfaceImplementers } from './setInterfaceImplementers.js';
import { ContractInterfaceCRUD } from '../crud.js';
import { GET_INTERFACE_IMPLEMENTERS, SET_INTERFACE_IMPLEMENTERS } from '../actions/index.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(ContractInterfaceCRUD.sagas.crudRootSaga),
        takeEvery(GET_INTERFACE_IMPLEMENTERS, wrapSagaWithErrorHandler(getInterfaceImplementers, GET_INTERFACE_IMPLEMENTERS)),
        takeEvery(SET_INTERFACE_IMPLEMENTERS, wrapSagaWithErrorHandler(setInterfaceImplementers, SET_INTERFACE_IMPLEMENTERS)),
    ]);
}
