import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { fetchSaga } from "./fetch.js";
import { EthLogAbiCRUD } from "../crud.js";
import { FETCH } from "../actions/fetch.js";

/** @internal */
export function* ethLogAbiSaga() {
    yield* all([spawn(EthLogAbiCRUD.sagas.crudRootSaga), takeEvery(FETCH, wrapSagaWithErrorHandler(fetchSaga, FETCH))]);
}
