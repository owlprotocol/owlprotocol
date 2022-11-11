import { all, takeEvery, spawn } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'

import getAssets from './getAssets.js';
import getPastLogs from './getPastLogs.js';
import subscribeLogsLoop from './subscribeLogs.js';
import { GET_PAST_LOGS, GET_ASSETS } from '../actions/index.js';
import ContractEventCRUD from '../crud.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(ContractEventCRUD.sagas.crudRootSaga),
        takeEvery(GET_PAST_LOGS, wrapSagaWithErrorHandler(getPastLogs, GET_PAST_LOGS)),
        takeEvery(GET_ASSETS, wrapSagaWithErrorHandler(getAssets, GET_ASSETS)),
        spawn(subscribeLogsLoop),
    ]);
}
