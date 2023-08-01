import { ChildName } from "@owlprotocol/crud-models/test";
import { ChildIdx, ChildTable } from "./childTable.js";
import { createCRUDDexie } from "../createCRUDDexie.js";
import { CRUDDexie } from "../table.js";
import { indexedDBShimMemory } from "../indexedDBShim.js";

export type TestTables = {
    [ChildName]: ChildTable;
};
const stores = {
    [ChildName]: ChildIdx,
};

export function createTestDexie() {
    indexedDBShimMemory("");
    return createCRUDDexie<TestTables>("createTestDexie", stores) as unknown as CRUDDexie<ChildTable> &
        TestTables & { clear(): Promise<any> };
}
