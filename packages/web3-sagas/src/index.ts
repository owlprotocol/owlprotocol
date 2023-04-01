export * from "./crudsagas/index.js";
export * from "./sagas/index.js";
export * from "./test/index.js";

import { all, spawn } from "typed-redux-saga";
import { crudRootSaga } from "./crudsagas/index.js";
import { customRootSaga } from "./sagas/index.js";

export function* web3RootSaga() {
    yield* all([spawn(crudRootSaga), spawn(customRootSaga)]);
}
