import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";

//Core IPFS API - Root
import { add } from "./add.js";
import { addAll } from "./addAll.js";
import { cat } from "./cat.js";
import { ADD, ADD_ALL, CAT } from "../actions/index.js";
import { IPFSCacheCRUD } from "../crud.js";

/** @internal */
export function* ipfsCacheSaga() {
    yield* all([
        spawn(IPFSCacheCRUD.sagas.crudRootSaga),
        takeEvery(ADD, wrapSagaWithErrorHandler(add, ADD)),
        takeEvery(ADD_ALL, wrapSagaWithErrorHandler(addAll, ADD_ALL)),
        takeEvery(CAT, wrapSagaWithErrorHandler(cat, CAT)),
    ]);
}
