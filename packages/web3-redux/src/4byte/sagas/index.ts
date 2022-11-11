import { all, takeEvery, spawn } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'
import _4ByteCRUD from '../crud.js';
import { fetchSaga } from './fetch.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(_4ByteCRUD.sagas.crudRootSaga),
        takeEvery(_4ByteCRUD.actionTypes.FETCH, wrapSagaWithErrorHandler(fetchSaga, _4ByteCRUD.actionTypes.FETCH)),
    ]);
}
