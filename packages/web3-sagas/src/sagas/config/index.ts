import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { ConfigCRUDActions } from "@owlprotocol/web3-actions";
import { all, takeEvery } from "typed-redux-saga";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";

export function* configSaga() {
    yield* all([
        takeEvery(ConfigCRUDActions.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(ConfigCRUDActions.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(ConfigCRUDActions.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
