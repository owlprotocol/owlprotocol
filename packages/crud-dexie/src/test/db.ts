import { ChildName } from "@owlprotocol/crud-models/test";
//@ts-ignore
import setGlobalVars from "indexeddbshim";
import { Dexie } from "dexie";
import { ChildIdx, ChildTable } from "./childTable.js";
import { createCRUDDexie } from "../createCRUDDexie.js";
import { CRUDDexie } from "../table.js";

export type TestTables = {
    [ChildName]: ChildTable;
};
const stores = {
    [ChildName]: ChildIdx,
};

export function indexedDBShim() {
    const window: any = {};
    setGlobalVars(window, { checkOrigin: false, memoryDatabase: "" }); // See signature below
    const { indexedDB, IDBKeyRange } = window;
    global.indexedDB = indexedDB;
    global.IDBKeyRange = IDBKeyRange;
    Dexie.dependencies.indexedDB = indexedDB;
    Dexie.dependencies.IDBKeyRange = IDBKeyRange;
    //@ts-expect-error
    Dexie.debug = true;
}

export function createTestDexie() {
    indexedDBShim();
    return createCRUDDexie<TestTables>("createTestDexie", stores) as unknown as CRUDDexie<ChildTable> &
        TestTables & { clear(): Promise<any> };
}

export const TestDexie = createTestDexie();
