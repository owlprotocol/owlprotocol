import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";
import { EthCallCRUDActions } from "@owlprotocol/web3-actions";
import { WEB3_CALL, Web3CallAction } from "@owlprotocol/web3-actions";
import { dbCreatingSaga, dbDeletingSaga, dbUpdatingSaga } from "./dbChange.js";
//import { watchWeb3CallSaga } from "./web3Call.js";
import { web3CallSaga } from "./web3Call.js";

/** @internal */
export function* ethCallSaga() {
    yield* all([
        //spawn(watchWeb3CallSaga),
        takeEvery(EthCallCRUDActions.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(EthCallCRUDActions.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(EthCallCRUDActions.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
        takeEvery(WEB3_CALL, wrapSagaWithErrorHandler<Web3CallAction>(web3CallSaga)),
    ]);
}

export * from "./web3Call.js";
