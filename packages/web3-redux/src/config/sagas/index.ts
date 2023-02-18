import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux';
import { all, spawn, takeEvery } from 'typed-redux-saga';
import ConfigCRUD from '../crud.js';
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from './dbChange.js';
import { fetchSaga } from './fetch.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(ConfigCRUD.sagas.crudRootSaga),
        takeEvery(ConfigCRUD.actionTypes.FETCH, wrapSagaWithErrorHandler(fetchSaga, ConfigCRUD.actionTypes.FETCH)),
        takeEvery(ConfigCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(ConfigCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(ConfigCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
