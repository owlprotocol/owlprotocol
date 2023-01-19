import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux';
import { all, takeEvery } from 'typed-redux-saga';
import { INITIALIZE } from '../actions/index.js';
import { initializeSaga } from './initialize.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        takeEvery(INITIALIZE, wrapSagaWithErrorHandler(initializeSaga, INITIALIZE))
    ]);
}
