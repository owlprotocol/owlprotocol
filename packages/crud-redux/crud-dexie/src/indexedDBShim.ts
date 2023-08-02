//@ts-ignore
import setGlobalVars from "indexeddbshim";
import { Dexie } from "dexie";
//TODO: Use isomorphic import
import log from "loglevel";

export function indexedDBShimMemory(name: string) {
    log.debug(`In-memory ${name} database`);
    const window: any = {};
    setGlobalVars(window, {
        checkOrigin: false,
        memoryDatabase: name,
    }); // See signature below
    const { indexedDB, IDBKeyRange } = window;
    //global.indexedDB = indexedDB;
    //global.IDBKeyRange = IDBKeyRange;
    Dexie.dependencies.indexedDB = indexedDB;
    Dexie.dependencies.IDBKeyRange = IDBKeyRange;
    //@ts-expect-error
    Dexie.debug = true;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
export function indexedDBShimSQLite(path: string) { }
/*
# TODO: Enable for NodeJS IndexedDB Shim
import { existsSync, mkdirSync } from "fs";
export function indexedDBShimSQLite(path: string) {
    log.debug(`SQLite ${path} database`);
    if (!existsSync(path)) mkdirSync(path);

    const window: any = {};
    setGlobalVars(window, {
        checkOrigin: false,
        sysDatabaseBasePath: path,
        databaseBasePath: path,
    });
    const { indexedDB, IDBKeyRange } = window;
    //global.indexedDB = indexedDB;
    //global.IDBKeyRange = IDBKeyRange;
    Dexie.dependencies.indexedDB = indexedDB;
    Dexie.dependencies.IDBKeyRange = IDBKeyRange;
    //@ts-expect-error
    Dexie.debug = true;
}
*/
