import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { EthSendCRUDActions } from "@owlprotocol/web3-actions";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";

/** @internal */
export function* ethSendSaga() {
    yield* all([
        takeEvery(EthSendCRUDActions.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(EthSendCRUDActions.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(EthSendCRUDActions.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
    ]);
}
