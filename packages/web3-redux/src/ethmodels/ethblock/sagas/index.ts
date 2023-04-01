import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";

import { fetchSaga } from "./fetch.js";
import { subscribeLoop } from "./subscribeLoop.js";
import { BlockCRUD } from "../crud.js";
import { FETCH } from "../actions/index.js";

/** @internal */
export function* ethBlockSaga() {
    yield* all([
        spawn(BlockCRUD.sagas.crudRootSaga),
        takeEvery(FETCH, wrapSagaWithErrorHandler(fetchSaga, FETCH)),
        spawn(subscribeLoop),
    ]);
}
