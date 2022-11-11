import { takeEvery, all, spawn } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'

import { callSaga } from './call.js';
import { callBatched } from './callBatched.js';
import { eventGetPast } from './eventGetPast.js';
import { eventSubscribeLoop } from './eventSubscribe.js';
import { sendSaga } from './send.js';
import { fetchAbi } from './fetchAbi.js';
import { getBalance } from './getBalance.js';
import { getNonce } from './getNonce.js';
import { fetchTransactions } from './fetchTransactions.js';
import { getCode } from './getCode.js';
import { getEns } from './getEns.js';
import watchEventGetPastRaw from './eventGetPastRaw.js';
import deploySaga from './deploy.js';
import {
    CALL_BATCHED,
    DEPLOY,
    SEND,
    EVENT_GET_PAST,
    FETCH_ABI,
    FETCH_TRANSACTIONS,
    GET_CODE,
    GET_ENS,
    GET_BALANCE,
    GET_NONCE,
    CALL,
    GET_SUPPORTS_INTERFACE,
} from '../actions/index.js';
import ContractCRUD from '../crud.js';
import { fetchSaga } from './fetch.js';
import { getSupportsInterfaceSaga } from './getSupportsInterface.js';

//https://typed-redux-saga.js.org/docs/advanced/RootSaga
/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(ContractCRUD.sagas.crudRootSaga),
        takeEvery(ContractCRUD.actionTypes.FETCH, wrapSagaWithErrorHandler(fetchSaga)),
        takeEvery(CALL, wrapSagaWithErrorHandler(callSaga, CALL)),
        takeEvery(DEPLOY, wrapSagaWithErrorHandler(deploySaga, DEPLOY)),
        takeEvery(EVENT_GET_PAST, wrapSagaWithErrorHandler(eventGetPast, EVENT_GET_PAST)),
        spawn(watchEventGetPastRaw),
        takeEvery(CALL_BATCHED, callBatched),
        takeEvery(SEND, wrapSagaWithErrorHandler(sendSaga, SEND)),
        spawn(eventSubscribeLoop),
        takeEvery(FETCH_ABI, wrapSagaWithErrorHandler(fetchAbi, FETCH_ABI)),
        takeEvery(GET_BALANCE, wrapSagaWithErrorHandler(getBalance, GET_BALANCE)),
        takeEvery(GET_NONCE, wrapSagaWithErrorHandler(getNonce, GET_NONCE)),
        takeEvery(GET_CODE, wrapSagaWithErrorHandler(getCode, GET_CODE)),
        takeEvery(FETCH_TRANSACTIONS, fetchTransactions),
        takeEvery(GET_ENS, wrapSagaWithErrorHandler(getEns, GET_ENS)),
        takeEvery(GET_SUPPORTS_INTERFACE, wrapSagaWithErrorHandler(getSupportsInterfaceSaga, GET_SUPPORTS_INTERFACE))
    ]);
}

export { callSaga, sendSaga };
