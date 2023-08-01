import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";

//Core IPFS API - Root
import { ADD, ADD_ALL } from "@owlprotocol/web3-actions";
import { add } from "./add.js";
import { addAll } from "./addAll.js";

/** @internal */
export function* IPFSCacheSaga() {
    yield* all([
        takeEvery(ADD, wrapSagaWithErrorHandler(add, ADD)),
        takeEvery(ADD_ALL, wrapSagaWithErrorHandler(addAll, ADD_ALL)),
    ]);
}
