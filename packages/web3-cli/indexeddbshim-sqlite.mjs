// db.ts
import Dexie from "dexie";
//@ts-ignore
import setGlobalVars from "indexeddbshim";
import { homedir } from "os";
import { mkdirSync, existsSync } from "fs";

if (!global.indexedDB || !global.IDBKeyRange) {
    console.debug("Init IndexedDBShim");
    const window = {};
    const home = homedir();
    const db = `${home}/owlprotocol`;
    if (!existsSync(db)) mkdirSync(db);

    setGlobalVars(window, {
        checkOrigin: false,
        //deleteDatabaseFiles: false,
        sysDatabaseBasePath: db,
        databaseBasePath: db,
        //DEBUG: true,
    }); // See signature below
    const { indexedDB, IDBKeyRange } = window;
    global.indexedDB = indexedDB;
    global.IDBKeyRange = IDBKeyRange;
    Dexie.dependencies.indexedDB = indexedDB;
    Dexie.dependencies.IDBKeyRange = IDBKeyRange;
    //@ts-expect-error
    Dexie.debug = true;
}
