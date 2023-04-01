import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { fetchSaga } from "./fetch.js";
import { EthTransactionCRUD } from "../crud.js";
import { FETCH } from "../actions/index.js";

/** @internal */
export function* ethTransactionSaga() {
    yield* all([
        spawn(EthTransactionCRUD.sagas.crudRootSaga),
        takeEvery(FETCH, wrapSagaWithErrorHandler(fetchSaga, FETCH)),
    ]);
}
