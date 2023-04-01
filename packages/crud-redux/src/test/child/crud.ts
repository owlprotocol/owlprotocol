import { ChildName } from "./common.js";
import {
    ChildId,
    Child,
    ChildIndexInput,
    ChildIndexInputAnyOf,
    toPrimaryKey,
    validateId,
    validate,
    preWriteBulkDB,
    postWriteBulkDB,
} from "./model/index.js";
import { createCRUDModel } from "../../crud/createCRUDModel.js";
import { CrudDexie, getDB } from "../db.js";

export const ChildCRUD = createCRUDModel<
    typeof ChildName,
    ChildId,
    Child,
    CrudDexie,
    ChildIndexInput,
    ChildIndexInputAnyOf
>({
    name: ChildName,
    getDB,
    validators: {
        validateId,
        validate,
        toPrimaryKey,
        preWriteBulkDB,
        postWriteBulkDB,
    },
});
