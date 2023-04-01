import { Dexie } from "dexie";
import { Concat, isStrings } from "@owlprotocol/utils";
import { CRUDTable } from "./table.js";

export type DexieIndexMultiEntry<T extends string = string> = { key: T; multiEntry: true };
export type DexieIndex = string | string[] | DexieIndexMultiEntry;
export type DexieIndexString<T extends DexieIndex> = T extends DexieIndexMultiEntry
    ? `*${T["key"]}`
    : T extends string[]
    ? //@ts-expect-error
    `[${Concat<T, "+">}]`
    : T;

/*
const k0 = "a"
const k1 = ["a", "b"] as ["a", "b"]
const k2 = { key: "a", multiEntry: true } as { key: "a", multiEntry: true }
type K0 = DexieIndexString<typeof k0>
type K1 = DexieIndexString<typeof k1>
type K2 = DexieIndexString<typeof k2>

const k0idx = createDexieIndexDefSingle(k0)
const k1idx = createDexieIndexDefSingle(k1)
const k2idx = createDexieIndexDefSingle(k0, true)
*/

/** First DexieIndex is id */
export function createDexieIndexDefSingle<T extends string, B extends boolean = false>(
    index: T,
    multiEntry?: B,
): B extends true ? `*${T}` : T;
export function createDexieIndexDefSingle<T extends string[]>(index: T, multiEntry?: never): `[${Concat<T, "+">}]`;
export function createDexieIndexDefSingle<T extends string | string[]>(index: T, multiEntry?: boolean) {
    if (typeof index === "string") {
        //Multi-Entry Index
        if (multiEntry) return `*${index}`;
        //Single Index
        return index;
    } else if (Array.isArray(index)) {
        //Compound Index
        return `[${index.join("+")}]`;
    }
}

export function createDexieIndexDef<T extends DexieIndex[]>(indices: T): string {
    return indices
        .map((c) => {
            if (typeof c === "string") {
                return createDexieIndexDefSingle(c, false);
            } else if (isStrings(c)) {
                return createDexieIndexDefSingle(c);
            } else {
                return createDexieIndexDefSingle(c.key, true);
            }
        })
        .join(",");
}

export function createCRUDDexie<Tables extends Record<any, CRUDTable<any, any, any, any, any, any>>>(
    name: string,
    stores: Record<keyof Tables, string>,
) {
    //console.debug({ indexedDB: !!Dexie.dependencies.indexedDB });
    const db = new Dexie(name) as Dexie & Tables & { clear(): Promise<any> };
    db.version(1).stores(stores);
    db.clear = () => {
        const promises = Object.keys(stores).map((k) => {
            return db[k as keyof Tables].clear();
        });
        return Promise.all(promises);
    };

    return db;
}
