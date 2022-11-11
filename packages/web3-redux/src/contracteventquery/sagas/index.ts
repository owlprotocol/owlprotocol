import { all, spawn } from 'typed-redux-saga';
import ContractEventQueryCRUD from '../crud.js';

/** @internal */
export function* rootSaga() {
    yield* all([spawn(ContractEventQueryCRUD.sagas.crudRootSaga)]);
}
