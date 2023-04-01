import { put, call } from "typed-redux-saga";
import { expectSaga } from "redux-saga-test-plan";
import { takeEveryMaxWorkers } from "./takeEveryMaxConcurrent.js";
import { sleep } from "../utils/index.js";

const time = Date.now();
function* sleepSaga(action: any) {
    yield* call(sleep, action.payload);

    const completed = Date.now();
    console.debug(`${completed - time} - ${JSON.stringify(action)}`);
    yield put({ type: "COMPLETE", payload: completed });
}

function* mainSaga() {
    yield* put({ id: 0, type: "START", payload: 100 });
    yield* put({ id: 1, type: "START", payload: 100 });
    yield* put({ id: 2, type: "START", payload: 100 });
    yield* put({ id: 3, type: "START", payload: 100 });
    yield takeEveryMaxWorkers("START", sleepSaga, 4);
}

describe("sagas/takeEveryMaxConcurrent.test.ts", () => {
    it("mainSaga()", async () => {
        expectSaga.DEFAULT_TIMEOUT = 1000;
        await expectSaga(mainSaga).run();
    });
});
