import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { ETHCALLABI_FETCH } from "@owlprotocol/web3-actions";
import { fetchSaga } from "./fetch.js";

/** @internal */
export function* ethCallAbiSaga() {
    yield* all([takeEvery(ETHCALLABI_FETCH, wrapSagaWithErrorHandler(fetchSaga, ETHCALLABI_FETCH))]);
}
