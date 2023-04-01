import { all, spawn, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-redux";

import { eventGetPastSaga } from "./web3GetPastLogs.js";
import { web3GetPastLogRawSaga } from "./web3GetPastLogsRaw.js";
import { WEB3_GET_PAST_LOGS } from "../actions/web3GetPastLogs.js";
import { WEB3_GET_PAST_LOGS_RAW } from "../actions/web3GetPastLogsRaw.js";
import { EthLogQueryCRUD } from "../crud.js";

/** @internal */
export function* ethLogQuerySaga() {
    yield* all([
        spawn(EthLogQueryCRUD.sagas.crudRootSaga),
        takeEvery(WEB3_GET_PAST_LOGS, wrapSagaWithErrorHandler(eventGetPastSaga)),
        takeEvery(WEB3_GET_PAST_LOGS_RAW, wrapSagaWithErrorHandler(web3GetPastLogRawSaga)),
    ]);
}
