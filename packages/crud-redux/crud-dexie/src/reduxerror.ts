import type { ReduxErrorId, ReduxError } from "@owlprotocol/crud-models";
import { ReduxErrorName } from "@owlprotocol/crud-models";
import type { Concat } from "@owlprotocol/utils";
import type { CRUDDexie, CRUDTable } from "./table.js";
import { createDexieIndexDefSingle } from "./createCRUDDexie.js";
import { createCRUDDB } from "./createCRUDDB.js";
export type { ReduxErrorId, ReduxError };
export { ReduxErrorName };

export type ReduxErrorKeyId = string;
export type ReduxErrorKeyIdEq = ReduxErrorId;
const ReduxErrorById = createDexieIndexDefSingle("uuid");
export const ReduxErrorIdx = [ReduxErrorById].join(",") as Concat<[typeof ReduxErrorById]>;
export type ReduxErrorKeyIdx = {
    [ReduxErrorById]: ReduxErrorKeyId;
};
export type ReduxErrorKeyIdxEq = ReduxErrorId;
export type ReduxErrorKeyIdxEqAny = { id: string[] | string };

export type ReduxErrorTable = CRUDTable<
    typeof ReduxErrorName,
    ReduxError,
    ReduxErrorKeyId,
    ReduxErrorKeyIdEq,
    ReduxErrorKeyIdx,
    ReduxErrorKeyIdxEq
>;

export function getReduxErrorDexie(db: CRUDDexie<ReduxErrorTable> & { [ReduxErrorName]: ReduxErrorTable }) {
    return createCRUDDB<
        typeof ReduxErrorName,
        ReduxError,
        ReduxErrorKeyId,
        ReduxErrorKeyIdEq,
        ReduxErrorKeyIdx,
        ReduxErrorKeyIdxEq,
        ReduxErrorKeyIdxEqAny
    >(db, db[ReduxErrorName], {
        validateId: ({ id }) => {
            return { id };
        },
        toPrimaryKey: ({ id }) => {
            return id;
        },
        preWriteBulkDB: (items) => Promise.resolve(items),
        postWriteBulkDB: () => Promise.resolve(),
    });
}
