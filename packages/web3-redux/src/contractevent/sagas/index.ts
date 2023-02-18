import { all, takeEvery, spawn } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'
import { ContractEventCRUD } from '../crud.js';
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from './dbChange.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(ContractEventCRUD.sagas.crudRootSaga),
        takeEvery(ContractEventCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(ContractEventCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(ContractEventCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
