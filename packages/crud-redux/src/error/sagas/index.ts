import { all, spawn } from 'typed-redux-saga';
import { ReduxErrorCRUD } from '../crud.js';

export * from './wrapSagaWithErrorHandler.js';

/** @internal */
export function* rootSaga() {
    yield* all([spawn(ReduxErrorCRUD.sagas.crudRootSaga)]);
}
