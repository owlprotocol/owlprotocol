import { all, spawn, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";
import { web3SubscribeLogsSaga, web3UnsubscribeLogsSaga } from "./web3SubscribeLogs.js";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";
import { EthLogSubscribeCRUD } from "../crud.js";
import { WEB3_SUBSCRIBE_LOGS, WEB3_UNSUBSCRIBE_LOGS } from "../actions/web3SubscribeLogs.js";

/** @internal */
export function* ethLogSubscribeSaga() {
    yield* all([
        spawn(EthLogSubscribeCRUD.sagas.crudRootSaga),
        takeEvery(EthLogSubscribeCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(EthLogSubscribeCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(EthLogSubscribeCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
        takeEvery(WEB3_SUBSCRIBE_LOGS, wrapSagaWithErrorHandler(web3SubscribeLogsSaga)),
        takeEvery(WEB3_UNSUBSCRIBE_LOGS, wrapSagaWithErrorHandler(web3UnsubscribeLogsSaga)),
    ]);
}
