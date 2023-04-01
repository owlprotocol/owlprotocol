import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { ETHLOGABI_FETCH } from "@owlprotocol/web3-actions";
import { fetchSaga } from "./fetch.js";

/** @internal */
export function* ethLogAbiSaga() {
    yield* all([takeEvery(ETHLOGABI_FETCH, wrapSagaWithErrorHandler(fetchSaga, ETHLOGABI_FETCH))]);
}
