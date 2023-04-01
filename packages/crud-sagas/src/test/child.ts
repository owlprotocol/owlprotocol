import { ChildCRUDActions } from "@owlprotocol/crud-actions/test";
import { ChildDexie } from "@owlprotocol/crud-dexie/test";
import { all, spawn } from "typed-redux-saga";
import { createCRUDSagas } from "../createCRUDSagas.js";

export const ChildCRUDSagas = createCRUDSagas(ChildCRUDActions, ChildDexie);

export function* childCRUDSaga() {
    yield* all([spawn(ChildCRUDSagas.crudRootSaga)]);
}
