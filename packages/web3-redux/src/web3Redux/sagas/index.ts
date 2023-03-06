import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux';
import { all, call, take, takeEvery } from 'typed-redux-saga';
import { INITIALIZE } from '../actions/index.js';
import { initializeSaga } from './initialize.js';

const initializeSagaWithErr = wrapSagaWithErrorHandler(initializeSaga, INITIALIZE)
/** @internal */
export function* rootSaga() {
    const action = yield* take(INITIALIZE)
    yield* call(initializeSagaWithErr, action)
}
