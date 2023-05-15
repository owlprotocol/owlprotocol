//@ts-ignore
import setGlobalVars from "indexeddbshim";
import { Dexie } from "dexie";
import { existsSync, mkdirSync } from "fs";
import log from "loglevel";

export function indexedDBShimMemory(name: string) {
    log.debug(`In-memory ${name} database`);
    const window: any = {};
    setGlobalVars(window, {
        checkOrigin: false,
        memoryDatabase: name
    }); // See signature below
    const { indexedDB, IDBKeyRange } = window;
    //global.indexedDB = indexedDB;
    //global.IDBKeyRange = IDBKeyRange;
    Dexie.dependencies.indexedDB = indexedDB;
    Dexie.dependencies.IDBKeyRange = IDBKeyRange;
    //@ts-expect-error
    Dexie.debug = true;
}

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
