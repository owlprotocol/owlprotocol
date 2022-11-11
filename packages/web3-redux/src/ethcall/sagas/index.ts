import { all, takeEvery, spawn } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'

import { fetchSaga } from './fetch.js';
import { FETCH } from '../actions/index.js';
import EthCallCRUD from '../crud.js';

/** @internal */
export function* rootSaga() {
    yield* all([spawn(EthCallCRUD.sagas.crudRootSaga), takeEvery(FETCH, wrapSagaWithErrorHandler(fetchSaga, FETCH))]);
}
