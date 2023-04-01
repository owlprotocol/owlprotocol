import { all, takeEvery, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";
import { ERC20CRUD } from "../crud.js";

/** @internal */
export function* erc20Saga() {
    yield* all([
        spawn(ERC20CRUD.sagas.crudRootSaga),
        takeEvery(ERC20CRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(ERC20CRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(ERC20CRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
