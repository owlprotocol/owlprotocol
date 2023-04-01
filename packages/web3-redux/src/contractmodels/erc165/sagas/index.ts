import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";
import { inferInterfaceSaga } from "./inferInterface.js";
import { ERC165CRUD } from "../crud.js";
import { INFER_INTERFACE } from "../actions/index.js";

/** @internal */
export function* erc165Saga() {
    yield* all([
        spawn(ERC165CRUD.sagas.crudRootSaga),
        takeEvery(ERC165CRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(ERC165CRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(ERC165CRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
        takeEvery(INFER_INTERFACE, wrapSagaWithErrorHandler(inferInterfaceSaga, INFER_INTERFACE)),
    ]);
}
