import { compact } from "lodash-es";
import Dexie, { IndexableType } from "dexie";

import { toReduxOrmId } from "../utils/toReduxORMId.js";

/**
 *
 * Creates common CRUD actions for a Redux/Dexie model including relevant action creators & sagas.
 * Automatically infers types.
 *
 * @param name
 * @param getDB
 * @param validators Validators used to sanitize data
 * @returns
 */
export function createCRUDDB<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends T_ID = T_ID,
    DexieCustom extends Dexie = Dexie,
    T_Idx = T_ID,
    T_IdxAnyOf = T_Idx,
>(
    name: U,
    getDB: () => DexieCustom,
    validators: {
        validateId: (id: T_ID) => T_ID;
        toPrimaryKey: (id: T_ID) => IndexableType;
        preWriteBulkDB: (item: T_Encoded[]) => Promise<T_Encoded[]>;
        postWriteBulkDB: (item: T_Encoded[]) => Promise<any>;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tables: string[] = [],
) {
    const { validateId, toPrimaryKey, preWriteBulkDB, postWriteBulkDB } = validators;

    /** Dexie Getters */
    const get = (idx: T_Idx | string | IndexableType) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return db.transaction("r?", table, () => {
            //@ts-expect-error
            return table.get(idx);
        });
    };

    const bulkGet = (ids: T_ID[] | string[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return db.transaction("r?", table, () => {
            return table.bulkGet(ids.map((id) => (typeof id === "string" ? id : toPrimaryKey(id))));
        });
    };

    const all = () => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.toArray();
    };

    const where = async (filter: T_Idx, options?: { reverse?: boolean; offset?: number; limit?: number }) => {
        const results = await bulkWhere([filter], options);
        return results[0];
    };

    const whereAnyOfFilters = (filter: T_IdxAnyOf) => {
        let filters: any[] = [];
        Object.entries(filter as any).forEach(([k, v]) => {
            const vArr = Array.isArray(v) ? v : [v];
            if (filters.length === 0) {
                filters = vArr.map((v) => {
                    return { [k]: v };
                });
            } else {
                filters = filters.map((f) => {
                    return { ...f, [k]: v };
                });
            }
        });
        return filters as T_Idx[];
    };

    //Any of index takes arrays as filter parameters, filters by permutation
    const whereAnyOf = (filter: T_IdxAnyOf, options?: { reverse?: boolean; offset?: number; limit?: number }) => {
        return bulkWhere(whereAnyOfFilters(filter), options);
    };

    //TODO: Typed
    const anyOf = (index: string, keys: string[] | string) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return db.transaction("r?", table, () => {
            return table.where(index).anyOf(keys).toArray();
        });
    };

    const bulkWhere = (filter: T_Idx[], options?: { reverse?: boolean; offset?: number; limit?: number }) => {
        const reverse = options?.reverse;
        const offset = options?.offset;
        const limit = options?.limit;

        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return db.transaction("r?", table, () => {
            return Promise.all(
                filter.map((f) => {
                    //@ts-expect-error
                    let result = table.where(f);
                    //@ts-expect-error
                    if (reverse) result = result.reverse();
                    //@ts-expect-error
                    if (offset) result = result.offset(offset);
                    //@ts-expect-error
                    if (limit) result = result.limit(limit);
                    return result.toArray();
                }),
            );
        });
    };

    const add = (item: T_Encoded) => {
        return bulkAdd([item]);
    };

    const addUnchained = (item: T_Encoded) => {
        return bulkAddUnchained([item]);
    };

    const addIfNull = async (item: T_Encoded) => {
        const id = toPrimaryKey(item);
        const exists = await get(id);
        if (!exists) add(item);
    };

    const bulkAdd = async (items: T_Encoded[]) => {
        return Dexie.ignoreTransaction(async () => {
            const items2 = await preWriteBulkDB(
                items.map((e) => {
                    return { ...e, ...validateId(e) };
                }),
            );
            await bulkAddUnchained(items2);
            await postWriteBulkDB(items2);
        });
    };

    const bulkAddUnchained = (items: T_Encoded[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return db.transaction("rw?", table.name, () => {
            return table
                .bulkAdd(
                    items.map((e) => {
                        return { ...e, ...validateId(e) };
                    }),
                )
                .catch(Dexie.BulkError, (e) => {
                    console.error(e.message);
                });
        });
    };

    const put = (item: T_Encoded) => {
        return bulkPut([item]);
    };

    const putUnchained = (item: T_Encoded) => {
        return bulkPut([item]);
    };

    const bulkPut = async (items: T_Encoded[]) => {
        return Dexie.ignoreTransaction(async () => {
            const items2 = await preWriteBulkDB(
                items.map((e) => {
                    return { ...e, ...validateId(e) };
                }),
            );
            await bulkPutUnchained(items2);
            await postWriteBulkDB(items2);
        });
    };

    const bulkPutUnchained = (items: T_Encoded[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return db.transaction("rw?", table.name, () => {
            return table
                .bulkPut(
                    items.map((e) => {
                        return { ...e, ...validateId(e) };
                    }),
                )
                .catch(Dexie.BulkError, (e) => {
                    console.error(e.message);
                });
        });
    };

    const update = (item: T_Encoded) => {
        return bulkUpdate([item]);
    };

    const updateUnchained = (item: T_Encoded) => {
        return bulkUpdateUnchained([item]);
    };

    const bulkUpdate = async (items: T_Encoded[]) => {
        return Dexie.ignoreTransaction(async () => {
            const items2 = await preWriteBulkDB(
                items.map((e) => {
                    return { ...e, ...validateId(e) };
                }),
            );
            await bulkUpdateUnchained(items2);
            await postWriteBulkDB(items2);
        });
    };

    const bulkUpdateUnchained = (items: T_Encoded[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        const updates = items
            .map((e) => {
                return { ...e, ...validateId(e) };
            })
            .map((t) => {
                //if NOT compound key, MUST be string
                return { key: toPrimaryKey(t), changes: t };
            });
        return db.transaction("rw?", table.name, () => {
            return table.bulkUpdate(updates).catch(Dexie.BulkError, (e) => {
                console.error(e.message);
            });
        });
    };

    const upsert = (item: T_Encoded) => {
        return bulkUpsert([item]);
    };

    const upsertUnchained = (item: T_Encoded) => {
        return bulkUpsertUnchained([item]);
    };

    const bulkUpsert = async (items: T_Encoded[]) => {
        return Dexie.ignoreTransaction(async () => {
            const items2 = await preWriteBulkDB(
                items.map((e) => {
                    return { ...e, ...validateId(e) };
                }),
            );
            await bulkUpsertUnchained(items2);
            await postWriteBulkDB(items2);
        });
    };

    const bulkUpsertUnchained = async (items: T_Encoded[]) => {
        const results = await bulkGet(items);
        //Track existing, bulkAdd, then bulkUpdate
        const exists = new Set<string>();
        const add: T_Encoded[] = [];
        const update: T_Encoded[] = [];
        compact(results).forEach((r) => exists.add(toReduxOrmId(toPrimaryKey(r))));

        items
            .map((e) => {
                return { ...e, ...validateId(e) };
            })
            .forEach((r) => {
                const id = toReduxOrmId(toPrimaryKey(r));
                if (!exists.has(id)) {
                    add.push(r);
                } else {
                    update.push(r);
                }
                exists.add(id);
            });

        await bulkAddUnchained(add);
        await bulkUpdateUnchained(update);
    };

    const deleteDB = (id: T_ID) => {
        return bulkDelete([id]);
    };

    const bulkDelete = (ids: T_ID[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return db.transaction("rw?", table.name, async () => {
            return table.bulkDelete(ids.map(toPrimaryKey));
        });
    };

    const clear = () => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return db.transaction("rw?", table.name, async () => {
            return table.clear();
        });
    };

    const table = () => getDB().table<T_Encoded>(name);

    const db = {
        table,
        get,
        bulkGet,
        all,
        where,
        whereAnyOfFilters,
        whereAnyOf,
        anyOf,
        bulkWhere,
        add,
        addUnchained,
        addIfNull,
        bulkAdd,
        bulkAddUnchained,
        put,
        putUnchained,
        bulkPut,
        bulkPutUnchained,
        update,
        updateUnchained,
        bulkUpdate,
        bulkUpdateUnchained,
        upsert,
        upsertUnchained,
        bulkUpsert,
        bulkUpsertUnchained,
        delete: deleteDB,
        bulkDelete,
        clear,
    };

    return db;
}
