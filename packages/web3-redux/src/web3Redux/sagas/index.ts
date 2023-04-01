import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { all, takeEvery } from "typed-redux-saga";
import { initializeSaga } from "./initialize.js";
import { clearSaga } from "./clear.js";
import { CLEAR, INITIALIZE } from "../actions/index.js";

/** @internal */
export function* web3ReduxSaga() {
    yield* all([
        takeEvery(CLEAR, wrapSagaWithErrorHandler(clearSaga, CLEAR)),
        takeEvery(INITIALIZE, wrapSagaWithErrorHandler(initializeSaga, INITIALIZE)),
    ]);
}
