import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";

import { FETCH_BLOCK } from "@owlprotocol/web3-actions";
import { fetchSaga } from "./fetch.js";
import { subscribeLoop } from "./subscribeLoop.js";

/** @internal */
export function* ethBlockSaga() {
    yield* all([takeEvery(FETCH_BLOCK, wrapSagaWithErrorHandler(fetchSaga, FETCH_BLOCK)), spawn(subscribeLoop)]);
}
