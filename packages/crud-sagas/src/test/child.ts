import { ChildCRUDActions } from "@owlprotocol/crud-actions/test";
import { getChildDexie, createTestDexie } from "@owlprotocol/crud-dexie/test";
import { all, spawn } from "typed-redux-saga";
import { createCRUDSagas } from "../createCRUDSagas.js";

export function getChildCRUDSagas(childDexie: ReturnType<typeof getChildDexie>) {
    return createCRUDSagas(ChildCRUDActions, childDexie);
}

export function* childCRUDSaga() {
    const ChildCRUDSagas = getChildCRUDSagas(getChildDexie(createTestDexie()));
    yield* all([spawn(ChildCRUDSagas.crudRootSaga)]);
}
