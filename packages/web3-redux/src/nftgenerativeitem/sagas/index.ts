import { all, takeEvery, spawn } from 'typed-redux-saga';
import { fetchSaga } from './fetch.js';
import { childAttachSaga } from './childAttach.js';
import { wrapSagaWithErrorHandler } from '@owlprotocol/crud-redux';
import { NFTGenerativeItemCRUD } from '../crud.js';
import { CHILD_ATTACH } from '../actions/index.js';

/** @internal */
export function* rootSaga() {
    yield* all([
        spawn(NFTGenerativeItemCRUD.sagas.crudRootSaga),
        takeEvery(
            NFTGenerativeItemCRUD.actionTypes.FETCH,
            wrapSagaWithErrorHandler(fetchSaga, NFTGenerativeItemCRUD.actionTypes.FETCH),
        ),
        takeEvery(CHILD_ATTACH, wrapSagaWithErrorHandler(childAttachSaga, CHILD_ATTACH)),
    ]);
}
