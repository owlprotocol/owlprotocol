import { ReduxErrorCRUDActions } from "@owlprotocol/crud-actions";
import { getReduxErrorDexie } from "@owlprotocol/crud-dexie";
import { createCRUDSagas } from "./createCRUDSagas.js";

export function getReduxErrorCRUDSagas(dexie: ReturnType<typeof getReduxErrorDexie>) {
    return createCRUDSagas(ReduxErrorCRUDActions, dexie);
}
