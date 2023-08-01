import { ChildName, Child, ChildId } from "@owlprotocol/crud-models/test";
import { Concat } from "@owlprotocol/utils";
import type { CRUDTable } from "../table.js";
import { createDexieIndexDefSingle } from "../createCRUDDexie.js";

export type { Child, ChildId };
export type ChildKeyId = [firstName: string, lastName: string];
export type ChildKeyIdEq = ChildId;
const ChildById = createDexieIndexDefSingle(["firstName", "lastName"] as ["firstName", "lastName"]);
const ChildByFirstName = createDexieIndexDefSingle("fistName");
const ChildByLastName = createDexieIndexDefSingle("lastName");
export const ChildIdx = [ChildById, ChildByFirstName, ChildByLastName].join(",") as Concat<
    [typeof ChildById, typeof ChildByFirstName, typeof ChildByLastName]
>;
export type ChildKeyIdx = {
    [ChildById]: ChildKeyId;
    [ChildByFirstName]: string;
    [ChildByLastName]: string;
};
export type ChildKeyIdxEq = ChildId | { firstName: string } | { lastName: string };
export type ChildKeyIdxEqAny =
    | { firstName: string[] | string; lastName: string[] | string }
    | { firstName: string[] | string }
    | { lastName: string[] | string };

export type ChildTable = CRUDTable<typeof ChildName, Child, ChildKeyId, ChildKeyIdEq, ChildKeyIdx, ChildKeyIdxEq>;
