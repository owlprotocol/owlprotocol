import { all, takeEvery, spawn } from 'typed-redux-saga';
import { fetchSaga } from './fetch.js';
import { TransactionCRUD } from '../crud.js';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(TransactionCRUD.sagas.crudRootSaga),
        takeEvery(TransactionCRUD.actionTypes.FETCH, fetchSaga)
        //takeEvery(TransactionCRUD.actionTypes.FETCH, wrapSagaWithErrorHandler(fetchSaga, TransactionCRUD.actionTypes.FETCH))
    ]);
}
