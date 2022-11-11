import { all, takeEvery, spawn } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'

import getBlockNumber from './getBlockNumber.js';
import getChainId from './getChainId.js';
import { GET_BLOCK_NUMBER, GET_CHAIN_ID } from '../actions/index.js';
import NetworkCRUD from '../crud.js';
import { fetchSaga } from './fetch.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(NetworkCRUD.sagas.crudRootSaga),
        //takeEvery(NetworkCRUD.actionTypes.FETCH, wrapSagaWithErrorHandler(fetchSaga, NetworkCRUD.actionTypes.FETCH)),
        takeEvery(NetworkCRUD.actionTypes.FETCH, fetchSaga),

        takeEvery(GET_BLOCK_NUMBER, wrapSagaWithErrorHandler(getBlockNumber, GET_BLOCK_NUMBER)),
        takeEvery(GET_CHAIN_ID, wrapSagaWithErrorHandler(getChainId, GET_CHAIN_ID)),
    ]);
}
