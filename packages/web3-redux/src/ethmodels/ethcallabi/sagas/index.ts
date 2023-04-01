import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { fetchSaga } from "./fetch.js";
import { EthCallAbiCRUD } from "../crud.js";
import { FETCH } from "../actions/fetch.js";

/** @internal */
export function* ethCallAbiSaga() {
    yield* all([
        spawn(EthCallAbiCRUD.sagas.crudRootSaga),
        takeEvery(FETCH, wrapSagaWithErrorHandler(fetchSaga, FETCH)),
    ]);
}
