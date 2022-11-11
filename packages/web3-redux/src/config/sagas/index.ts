import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux';
import { all, spawn, takeEvery } from 'typed-redux-saga';
import ConfigCRUD from '../crud.js';
import { fetchSaga } from './fetch.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(ConfigCRUD.sagas.crudRootSaga),
        takeEvery(ConfigCRUD.actionTypes.FETCH, wrapSagaWithErrorHandler(fetchSaga, ConfigCRUD.actionTypes.FETCH))
    ]);
}
