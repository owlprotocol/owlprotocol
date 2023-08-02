import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { EthLogSubscribeCRUDActions, WEB3_SUBSCRIBE_LOGS, WEB3_UNSUBSCRIBE_LOGS } from "@owlprotocol/web3-actions";
import { web3SubscribeLogsSaga, web3UnsubscribeLogsSaga } from "./web3SubscribeLogs.js";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";

/** @internal */
export function* ethLogSubscribeSaga() {
    yield* all([
        takeEvery(EthLogSubscribeCRUDActions.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(EthLogSubscribeCRUDActions.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(EthLogSubscribeCRUDActions.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
        takeEvery(WEB3_SUBSCRIBE_LOGS, wrapSagaWithErrorHandler(web3SubscribeLogsSaga)),
        takeEvery(WEB3_UNSUBSCRIBE_LOGS, wrapSagaWithErrorHandler(web3UnsubscribeLogsSaga)),
    ]);
}
