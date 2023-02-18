import { takeEvery, all, spawn } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'

import { callSaga } from './call.js';
import { callBatched } from './callBatched.js';
import { sendSaga } from './send.js';
import { fetchAbi } from './fetchAbi.js';
import { getBalance } from './getBalance.js';
import { getNonce } from './getNonce.js';
import { fetchTransactions } from './fetchTransactions.js';
import { getCodeSaga } from './getCode.js';
import { getEns } from './getEns.js';
import { deploySaga } from './deploy.js';
import {
    CALL_BATCHED,
    DEPLOY,
    SEND,
    FETCH_ABI,
    FETCH_TRANSACTIONS,
    GET_CODE,
    GET_ENS,
    GET_BALANCE,
    GET_NONCE,
    CALL,
    INFER_INTERFACE,
} from '../actions/index.js';
import ContractCRUD from '../crud.js';
import { fetchSaga } from './fetch.js';

import { dbCreatingSaga, dbUpdatingSaga, dbDeletingSaga } from './dbChange.js';
import { inferInterfaceSaga } from './inferInterface.js';

//https://typed-redux-saga.js.org/docs/advanced/RootSaga
/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(ContractCRUD.sagas.crudRootSaga),
        takeEvery(ContractCRUD.actionTypes.FETCH, wrapSagaWithErrorHandler(fetchSaga)),
        takeEvery(ContractCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(ContractCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(ContractCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
        takeEvery(CALL, wrapSagaWithErrorHandler(callSaga, CALL)),
        takeEvery(DEPLOY, wrapSagaWithErrorHandler(deploySaga, DEPLOY)),
        takeEvery(CALL_BATCHED, callBatched),
        takeEvery(SEND, wrapSagaWithErrorHandler(sendSaga, SEND)),
        takeEvery(FETCH_ABI, wrapSagaWithErrorHandler(fetchAbi, FETCH_ABI)),
        takeEvery(GET_BALANCE, wrapSagaWithErrorHandler(getBalance, GET_BALANCE)),
        takeEvery(GET_NONCE, wrapSagaWithErrorHandler(getNonce, GET_NONCE)),
        takeEvery(GET_CODE, wrapSagaWithErrorHandler(getCodeSaga, GET_CODE)),
        takeEvery(FETCH_TRANSACTIONS, fetchTransactions),
        takeEvery(GET_ENS, wrapSagaWithErrorHandler(getEns, GET_ENS)),
        takeEvery(INFER_INTERFACE, wrapSagaWithErrorHandler(inferInterfaceSaga, INFER_INTERFACE))
    ]);
}

export { callSaga, sendSaga };
