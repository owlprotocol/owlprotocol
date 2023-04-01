import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { TRANSACTION_FETCH } from "@owlprotocol/web3-actions";
import { fetchSaga } from "./fetch.js";

/** @internal */
export function* ethTransactionSaga() {
    yield* all([takeEvery(TRANSACTION_FETCH, wrapSagaWithErrorHandler(fetchSaga, TRANSACTION_FETCH))]);
}
