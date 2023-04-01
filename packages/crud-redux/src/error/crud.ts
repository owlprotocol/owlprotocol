import Dexie from "dexie";
import { ReduxErrorName } from "./common.js";
import {
    ReduxErrorId,
    ReduxError,
    ReduxErrorIndexInput,
    ReduxErrorIndexInputAnyOf,
    toPrimaryKey,
    validateId,
    validate,
} from "./model/index.js";
import { createCRUDModel } from "../crud/createCRUDModel.js";

export function getReduxErrorCRUD<DexieCustom extends Dexie = Dexie>(getDB: () => DexieCustom) {
    return createCRUDModel<
        typeof ReduxErrorName,
        ReduxErrorId,
        ReduxError,
        DexieCustom,
        ReduxErrorIndexInput,
        ReduxErrorIndexInputAnyOf
    >({
        name: ReduxErrorName,
        getDB,
        validators: {
            validateId,
            validate,
            toPrimaryKey,
        },
    });
}
