import { createCRUDModel } from "@owlprotocol/crud-redux";
import { BaseSyncId, Sync, SyncIndexInput, validate, validateId, toPrimaryKey } from "./model/index.js";
import { SyncName } from "./common.js";
import { getDB, Web3ReduxDexie } from "../db.js";

export const SyncCRUD = createCRUDModel<
    typeof SyncName,
    BaseSyncId,
    Sync,
    Web3ReduxDexie,
    SyncIndexInput,
    SyncIndexInput
>({
    name: SyncName,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
    },
});
