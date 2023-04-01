// db.ts
import Dexie, { Table } from "dexie";
import { ChildName } from "./child/common.js";
import { Child, ChildIndex } from "./child/model/interface.js";
import { ReduxError, ReduxErrorIndex } from "../error/model/index.js";

import { ReduxErrorName as ReduxErrorName } from "../error/common.js";
import { isClient } from "../utils/isClient.js";

export class CrudDexie extends Dexie {
    [ReduxErrorName]!: Table<ReduxError>;
    [ChildName]!: Table<Child>;

    constructor() {
        super("CRUD_REDUX");
        this.version(1).stores({
            [ReduxErrorName]: ReduxErrorIndex,
            [ChildName]: ChildIndex,
        });
    }

    clear() {
        const promises = [this[ReduxErrorName].clear(), this[ChildName].clear()];
        return Promise.all(promises);
    }
}

let db: CrudDexie;

export function getDB() {
    if (db) return db;
    db = createDB();
    return db;
}

export function createDB() {
    if (!isClient()) {
        console.debug("Creating Dexie with fake-indexeddb");
    } else {
        console.debug("Creating Dexie with real indexeddb");
    }
    return new CrudDexie();
}
