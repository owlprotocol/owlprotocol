import { all, takeEvery, spawn } from 'typed-redux-saga';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux'
import { AssetPickerCRUD } from '../crud.js';
import { fetchSaga } from './fetch.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(AssetPickerCRUD.sagas.crudRootSaga),
        takeEvery(AssetPickerCRUD.actionTypes.FETCH, wrapSagaWithErrorHandler(fetchSaga, AssetPickerCRUD.actionTypes.FETCH)),
    ]);
}
