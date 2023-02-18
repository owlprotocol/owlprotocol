import { all, spawn, takeEvery } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'
import { ContractEventSubscribeCRUD } from '../crud.js';
import { eventSubscribe, eventUnSubscribe } from './eventSubscribe.js';
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from './dbChange.js';
import { EVENT_SUBSCRIBE, EVENT_UNSUBSCRIBE } from '../actions/eventSubscribe.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(ContractEventSubscribeCRUD.sagas.crudRootSaga),
        takeEvery(ContractEventSubscribeCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(ContractEventSubscribeCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(ContractEventSubscribeCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
        takeEvery(EVENT_SUBSCRIBE, wrapSagaWithErrorHandler(eventSubscribe)),
        takeEvery(EVENT_UNSUBSCRIBE, wrapSagaWithErrorHandler(eventUnSubscribe)),
    ]);
}
