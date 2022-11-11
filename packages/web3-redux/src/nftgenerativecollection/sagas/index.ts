import { all, takeEvery, spawn } from 'typed-redux-saga';
import { fetchSaga } from './fetch.js';
import { NFTGenerativeCollectionCRUD } from '../crud.js';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(NFTGenerativeCollectionCRUD.sagas.crudRootSaga),
        takeEvery(
            NFTGenerativeCollectionCRUD.actionTypes.FETCH,
            wrapSagaWithErrorHandler(fetchSaga, NFTGenerativeCollectionCRUD.actionTypes.FETCH),
        ),
    ]);
}
