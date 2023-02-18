import { all, takeEvery, spawn } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'

import { fetchSaga } from './fetch.js';
import { FETCH } from '../actions/index.js';
import { EthCallCRUD } from '../crud.js';
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from './dbChange.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(EthCallCRUD.sagas.crudRootSaga),
        takeEvery(FETCH, wrapSagaWithErrorHandler(fetchSaga, FETCH)),
        takeEvery(EthCallCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(EthCallCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(EthCallCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
