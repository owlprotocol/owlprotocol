import { all, spawn } from "typed-redux-saga";
import { ChildCRUD } from "../crud.js";

/** @internal */
export function* childSaga() {
    yield* all([spawn(ChildCRUD.sagas.crudRootSaga)]);
}
