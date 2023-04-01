import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { all, spawn, takeEvery } from "typed-redux-saga";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";
import { ConfigCRUD } from "../crud.js";

/** @internal */
export function* configSaga() {
    yield* all([
        spawn(ConfigCRUD.sagas.crudRootSaga),
        takeEvery(ConfigCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(ConfigCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(ConfigCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
