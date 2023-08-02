import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { all, takeEvery } from "typed-redux-saga";
import { CLEAR, INITIALIZE } from "@owlprotocol/web3-actions";
import { initializeSaga } from "./initialize.js";
import { clearSaga } from "./clear.js";

/** @internal */
export function* web3ReduxSaga() {
    yield* all([
        takeEvery(CLEAR, wrapSagaWithErrorHandler(clearSaga, CLEAR)),
        takeEvery(INITIALIZE, wrapSagaWithErrorHandler(initializeSaga, INITIALIZE)),
    ]);
}
