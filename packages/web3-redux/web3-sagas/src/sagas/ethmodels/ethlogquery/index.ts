import { all, takeEvery } from "typed-redux-saga";
import { wrapSagaWithErrorHandler } from "@owlprotocol/crud-sagas";

import { WEB3_GET_PAST_LOGS } from "@owlprotocol/web3-actions";
import { WEB3_GET_PAST_LOGS_RAW } from "@owlprotocol/web3-actions";
import { web3GetPastLogRawSaga } from "./web3GetPastLogsRaw.js";
import { eventGetPastSaga } from "./web3GetPastLogs.js";

/** @internal */
export function* ethLogQuerySaga() {
    yield* all([
        takeEvery(WEB3_GET_PAST_LOGS, wrapSagaWithErrorHandler(eventGetPastSaga)),
        takeEvery(WEB3_GET_PAST_LOGS_RAW, wrapSagaWithErrorHandler(web3GetPastLogRawSaga)),
    ]);
}
