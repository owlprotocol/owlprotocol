import { all, spawn } from "typed-redux-saga";
import { watchHttpGetSaga } from "./httpGet.js";

/** @internal */
export function* HTTPCacheSaga() {
    yield* all([spawn(watchHttpGetSaga)]);
}
