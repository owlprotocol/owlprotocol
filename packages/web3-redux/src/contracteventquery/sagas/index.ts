import { all, spawn, takeEvery } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'

import { EVENT_GET_PAST } from '../actions/eventGetPast.js';
import { EVENT_GET_PAST_RAW } from '../actions/eventGetPastRaw.js';
import { ContractEventQueryCRUD } from '../crud.js';
import { eventGetPastSaga } from './eventGetPast.js';
import { eventGetPastRawSaga } from './eventGetPastRaw.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(ContractEventQueryCRUD.sagas.crudRootSaga),
        takeEvery(EVENT_GET_PAST, wrapSagaWithErrorHandler(eventGetPastSaga)),
        takeEvery(EVENT_GET_PAST_RAW, wrapSagaWithErrorHandler(eventGetPastRawSaga)),
    ]);
}
