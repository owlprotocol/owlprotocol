import { zip } from 'lodash-es';
import Dexie, { IndexableTypeArrayReadonly } from 'dexie';

import { T_Encoded_Base } from './model.js';
import { createCRUDValidators } from './createCRUDValidators.js';

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
    T_Encoded extends (T_ID & T_Encoded_Base) = T_ID & T_Encoded_Base,
    T extends T_Encoded = T_Encoded,
    T_Idx = T_ID,
    DB extends Dexie = Dexie,
>(
    name: U,
    getDB: () => DB,
    validators: ReturnType<typeof createCRUDValidators<T_ID, T_Encoded, T>>,
) {

    const { encode, toPrimaryKey } = validators;

    /** Dexie Getters */
    const get = (idx: T_Idx | string) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        //@ts-expect-error
        return table.get(idx);
    };

    const bulkGet = (ids: T_ID[] | string[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkGet(ids.map((id) => (typeof id === 'string' ? id : toPrimaryKey(id))));
    };

    const all = () => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.toArray();
    };

    const where = (filter: T_Idx, options?: { reverse?: boolean; offset?: number; limit?: number }) => {
        const reverse = options?.reverse;
        const offset = options?.offset;
        const limit = options?.limit;

        const db = getDB();
        const table = db.table<T_Encoded>(name);
        //@ts-expect-error
        let result = table.where(filter);
        //@ts-expect-error
        if (reverse) result = result.reverse();
        //@ts-expect-error
        if (offset) result = result.offset(offset);
        //@ts-expect-error
        if (limit) result = result.limit(limit);

        return result.toArray();
    };

    const add = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.add({ ...encode(item), updatedAt: Date.now() });
    };

    const bulkAdd = (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkAdd(items.map(encode).map((item) => { return { ...item, updatedAt: Date.now() } }));
    };

    const put = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.put({ ...encode(item), updatedAt: Date.now() });
    };

    const bulkPut = (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkPut(items.map(encode).map((item) => { return { ...item, updatedAt: Date.now() } }));
    };

    const update = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        const encoded = encode({ ...item, updatedAt: Date.now() });
        return table.update(encoded, encoded);
    };

    const bulkUpdate = (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        return db.transaction('rw', table, () => {
            const promises = items.map((t) => {
                const encoded = encode({ ...t, updatedAt: Date.now() });
                table.update(encoded, encoded);
            });
            return Promise.all(promises);
        });
    };

    const upsert = (item: T) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        const id = toPrimaryKey(item);
        const encoded = encode({ ...item, updatedAt: Date.now() });

        return db.transaction('rw', table, () => {
            return table.get(id).then((existing) => {
                if (!existing) return table.add(encoded);
                else return table.update(id, encoded);
            });
        });
    };

    const bulkUpsert = async (items: T[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);

        const ids = items.map(toPrimaryKey);
        const encoded = items.map(encode).map((item) => { return { ...item, updatedAt: Date.now() } });

        return db.transaction('rw', table, () => {
            return table.bulkGet(ids).then((results) => {
                const joined = zip(encoded, ids, results) as [
                    T_Encoded,
                    IndexableTypeArrayReadonly,
                    T_Encoded | undefined,
                ][];
                const promises = joined.map(([data, id, result]) => {
                    if (!result) return table.add(data!);
                    else return table.update(id, data);
                });
                return Promise.all(promises);
            });
        });
    };

    const deleteDB = (id: T_ID) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.delete(Object.values(id));
    };

    const bulkDelete = (ids: T_ID[]) => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.bulkDelete(ids.map(Object.values));
    };

    const clear = () => {
        const db = getDB();
        const table = db.table<T_Encoded>(name);
        return table.clear();
    };

    const db = {
        get,
        bulkGet,
        all,
        where,
        add,
        bulkAdd,
        put,
        bulkPut,
        update,
        bulkUpdate,
        upsert,
        bulkUpsert,
        delete: deleteDB,
        bulkDelete,
        clear,
    };

    return db
}
