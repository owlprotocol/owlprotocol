import { compact } from "lodash-es";
import { Dexie, liveQuery, Observable, PromiseExtended } from "dexie";
import { CRUDDexie, CRUDTable } from "./table.js";
import log from "loglevel";

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
export function createCRUDDB<U extends string, T, TKeyId, TKeyIdEq, TKeyIdx, TKeyIdxEq, TKeyIdxEqAny>(
    db: CRUDDexie<any>, //TODO: Stronger typed db?
    table: CRUDTable<U, T, TKeyId, TKeyIdEq, TKeyIdx, TKeyIdxEq>,
    validators: {
        validateId: (id: T | TKeyIdEq) => TKeyIdEq;
        toPrimaryKey: (id: T | TKeyIdEq) => TKeyId;
        preWriteBulkDB: (items: T[]) => Promise<T[]>;
        postWriteBulkDB: (items: T[]) => Promise<any>;
    },
) {
    const { validateId, toPrimaryKey, preWriteBulkDB, postWriteBulkDB } = validators;

    /** Dexie Getters */
    const get = function (id: TKeyIdEq): PromiseExtended<T | undefined> {
        return db.transaction("r?", table, () => {
            return table.get(toPrimaryKey(id));
        });
    };

    const getLiveQuery = function (id: TKeyIdEq): Observable<T | undefined> {
        return liveQuery(() => get(id));
    };

    const bulkGet = function (ids: TKeyIdEq[]): PromiseExtended<(T | undefined)[]> {
        return db.transaction("r?", table, () => {
            return table.bulkGet(ids.map(toPrimaryKey));
        });
    };

    const all = function (): PromiseExtended<T[]> {
        return table.toArray();
    };

    const where = async function (
        filter: TKeyIdxEq,
        options?: { reverse?: boolean; offset?: number; limit?: number },
    ): Promise<T[]> {
        const results = await bulkWhere([filter], options);
        return results[0];
    };

    const whereAnyOfFilters = (filter: TKeyIdxEqAny) => {
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
        return filters as TKeyIdxEq[];
    };

    //Any of index takes arrays as filter parameters, filters by permutation
    const whereAnyOf = function (
        filter: TKeyIdxEqAny,
        options?: { reverse?: boolean; offset?: number; limit?: number },
    ): PromiseExtended<T[][]> {
        return bulkWhere(whereAnyOfFilters(filter), options);
    };

    //TODO: Typed
    const anyOf = function (index: keyof TKeyIdx, keys: TKeyIdx[typeof index][]): PromiseExtended<T[]> {
        return db.transaction("r?", table, () => {
            return table
                .where(index)
                .anyOf(...keys)
                .toArray();
        });
    };

    const bulkWhere = function (
        filter: TKeyIdxEq[],
        options?: { reverse?: boolean; offset?: number; limit?: number },
    ): PromiseExtended<T[][]> {
        const reverse = options?.reverse;
        const offset = options?.offset;
        const limit = options?.limit;

        return Dexie.ignoreTransaction(() => {
            return db.transaction("r?", table, () => {
                return Promise.all(
                    filter.map((f) => {
                        let result = table.where(f);
                        if (reverse) result = result.reverse();
                        if (offset) result = result.offset(offset);
                        if (limit) result = result.limit(limit);
                        return result.toArray();
                    }),
                );
            });
        });
    };

    const add = (item: T) => {
        return bulkAdd([item]);
    };

    const addUnchained = (item: T) => {
        return bulkAddUnchained([item]);
    };

    const addIfNull = (item: T) => {
        return Dexie.ignoreTransaction(async () => {
            const exists = await get(validateId(item));
            if (!exists) await add(item);
        });
    };

    const bulkAdd = (items: T[]) => {
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

    const bulkAddUnchained = (items: T[]) => {
        return db.transaction("rw?", table.name, () => {
            return table
                .bulkAdd(
                    items.map((e) => {
                        return { ...e, ...validateId(e) };
                    }),
                )
                .catch(Dexie.BulkError, (e) => {
                    log.error(e.message);
                });
        });
    };

    const put = (item: T) => {
        return bulkPut([item]);
    };

    const putUnchained = (item: T) => {
        return bulkPut([item]);
    };

    const bulkPut = async (items: T[]) => {
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

    const bulkPutUnchained = (items: T[]) => {
        return db.transaction("rw?", table, () => {
            return table
                .bulkPut(
                    items.map((e) => {
                        return { ...e, ...validateId(e) };
                    }),
                )
                .catch(Dexie.BulkError, (e) => {
                    log.error(e.message);
                });
        });
    };

    const update = (item: T) => {
        return bulkUpdate([item]);
    };

    const updateUnchained = (item: T) => {
        return bulkUpdateUnchained([item]);
    };

    const bulkUpdate = async (items: T[]) => {
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

    const bulkUpdateUnchained = (items: T[]) => {
        const updates = items
            .map((e) => {
                return { ...e, ...validateId(e) };
            })
            .map((t) => {
                //if NOT compound key, MUST be string
                return { key: toPrimaryKey(t), changes: t };
            });
        return db.transaction("rw?", table, () => {
            return table.bulkUpdate(updates).catch(Dexie.BulkError, (e) => {
                log.error(e.message);
            });
        });
    };

    const upsert = (item: T) => {
        return bulkUpsert([item]);
    };

    const upsertUnchained = (item: T) => {
        return bulkUpsertUnchained([item]);
    };

    const bulkUpsert = async (items: T[]) => {
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

    const bulkUpsertUnchained = async (items: T[]) => {
        const results = await bulkGet(items.map(validateId));
        //Track existing, bulkAdd, then bulkUpdate
        const exists = new Set<string>();
        const add: T[] = [];
        const update: T[] = [];
        compact(results).forEach((r) => exists.add(JSON.stringify(toPrimaryKey(r))));

        items
            .map((e) => {
                return { ...e, ...validateId(e) };
            })
            .forEach((r) => {
                const id = JSON.stringify(toPrimaryKey(r));
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

    const deleteDB = (id: TKeyIdEq) => {
        return bulkDelete([id]);
    };

    const bulkDelete = (ids: TKeyIdEq[]) => {
        return db.transaction("rw?", table, async () => {
            return table.bulkDelete(ids.map(toPrimaryKey));
        });
    };

    const clear = () => {
        return db.transaction("rw?", table.name, async () => {
            return table.clear();
        });
    };

    const wrappers = {
        db,
        table,
        get,
        getLiveQuery,
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

    return wrappers;
}
