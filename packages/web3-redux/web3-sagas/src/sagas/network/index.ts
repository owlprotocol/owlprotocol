import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";

import { GET_BLOCK_NUMBER, GET_CHAIN_ID } from "@owlprotocol/web3-actions";
import { NetworkCRUDActions } from "@owlprotocol/web3-actions";
import { getBlockNumberSaga } from "./getBlockNumber.js";
import { getChainId } from "./getChainId.js";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";

/** @internal */
export function* networkSaga() {
    yield* all([
        takeEvery(NetworkCRUDActions.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(NetworkCRUDActions.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(NetworkCRUDActions.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
        takeEvery(GET_BLOCK_NUMBER, wrapSagaWithErrorHandler(getBlockNumberSaga, GET_BLOCK_NUMBER)),
        takeEvery(GET_CHAIN_ID, wrapSagaWithErrorHandler(getChainId, GET_CHAIN_ID)),
    ]);
}
