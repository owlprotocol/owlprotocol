import { takeEvery, all, spawn } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";

import { contractCallSaga } from "./contractCall.js";
import { contractSendSaga } from "./contractSend.js";
import { fetchAbi } from "./fetchAbi.js";
import { getBalance } from "./getBalance.js";
import { getNonce } from "./getNonce.js";
import { fetchTransactions } from "./fetchTransactions.js";
import { getCodeSaga } from "./getCode.js";
import { getEns } from "./getEns.js";
import { dbCreatingSaga, dbUpdatingSaga, dbDeletingSaga } from "./dbChange.js";
import {
    CONTRACT_SEND,
    FETCH_ABI,
    FETCH_TRANSACTIONS,
    GET_CODE,
    GET_ENS,
    GET_BALANCE,
    GET_NONCE,
    CONTRACT_CALL,
} from "../actions/index.js";
import { ContractCRUD } from "../crud.js";

//https://typed-redux-saga.js.org/docs/advanced/RootSaga
/** @internal */
export function* contractSaga() {
    yield* all([
        spawn(ContractCRUD.sagas.crudRootSaga),
        takeEvery(ContractCRUD.actionTypes.DB_CREATING, wrapSagaWithErrorHandler(dbCreatingSaga)),
        takeEvery(ContractCRUD.actionTypes.DB_UPDATING, wrapSagaWithErrorHandler(dbUpdatingSaga)),
        takeEvery(ContractCRUD.actionTypes.DB_DELETING, wrapSagaWithErrorHandler(dbDeletingSaga)),
        takeEvery(
            CONTRACT_CALL,
            //@ts-expect-error
            wrapSagaWithErrorHandler(contractCallSaga, CONTRACT_CALL),
        ),
        takeEvery(
            CONTRACT_SEND,
            //@ts-expect-error
            wrapSagaWithErrorHandler(contractSendSaga, CONTRACT_SEND),
        ),
        takeEvery(FETCH_ABI, wrapSagaWithErrorHandler(fetchAbi, FETCH_ABI)),
        takeEvery(GET_BALANCE, wrapSagaWithErrorHandler(getBalance, GET_BALANCE)),
        takeEvery(GET_NONCE, wrapSagaWithErrorHandler(getNonce, GET_NONCE)),
        takeEvery(GET_CODE, wrapSagaWithErrorHandler(getCodeSaga, GET_CODE)),
        takeEvery(FETCH_TRANSACTIONS, fetchTransactions),
        takeEvery(GET_ENS, wrapSagaWithErrorHandler(getEns, GET_ENS)),
    ]);
}
