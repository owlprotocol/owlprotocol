import { all, spawn } from "typed-redux-saga";

import { childSaga } from "./child/sagas/index.js";
import { getDB } from "./db.js";
import { getReduxErrorCRUD } from "../error/crud.js";

const ReduxErrorCRUD = getReduxErrorCRUD(getDB);
//https://typed-redux-saga.js.org/docs/advanced/RootSaga.html
export function* rootSaga() {
    yield* all([spawn(ReduxErrorCRUD.sagas.crudRootSaga), spawn(childSaga)]);
}
