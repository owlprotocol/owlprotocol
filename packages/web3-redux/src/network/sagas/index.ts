import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";

import { getBlockNumberSaga } from "./getBlockNumber.js";
import { getChainId } from "./getChainId.js";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";
import { GET_BLOCK_NUMBER, GET_CHAIN_ID } from "../actions/index.js";
import { NetworkCRUD } from "../crud.js";

/** @internal */
export function* networkSaga() {
    yield* all([
        spawn(NetworkCRUD.sagas.crudRootSaga),
        takeEvery(NetworkCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(NetworkCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(NetworkCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
        takeEvery(GET_BLOCK_NUMBER, wrapSagaWithErrorHandler(getBlockNumberSaga, GET_BLOCK_NUMBER)),
        takeEvery(GET_CHAIN_ID, wrapSagaWithErrorHandler(getChainId, GET_CHAIN_ID)),
    ]);
}
