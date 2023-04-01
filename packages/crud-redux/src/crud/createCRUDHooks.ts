import { useLiveQuery } from "dexie-react-hooks";
import { useSelector } from "react-redux";

import { Dexie } from "dexie";
import { createCRUDActions } from "./createCRUDActions.js";

import { createCRUDDB } from "./createCRUDDB.js";
import { createCRUDSelectors } from "./createCRUDSelectors.js";
import { isDefinedRecord, isDefined } from "../utils/index.js";

//Create CRUD Hooks.
//GOAL: Decouple crud-redux from react
/**
 *
 * Creates common CRUD actions for a Redux/Dexie model including relevant action creators & sagas.
 * Automatically infers types.
 *
 * @param name
 * @param validators Validators used to sanitize data
 * @param crudActions
 * @param crudSelectors
 * @param crudDB
 * @returns
 */
export function createCRUDHooks<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends T_ID = T_ID,
    DexieCustom extends Dexie = Dexie,
    T_Idx = T_ID,
    T_IdxAnyOf = T_Idx,
    T_Partial = T_Encoded,
    T_Redux = T_Encoded,
>(
    validators: {
        validateId: (id: T_ID) => T_ID;
    },
    crudActions: ReturnType<typeof createCRUDActions<U, T_ID, T_Encoded, T_Partial, T_Redux>>,
    crudSelectors: ReturnType<typeof createCRUDSelectors<U, T_ID, T_Encoded, T_Redux>>,
    crudDB: ReturnType<typeof createCRUDDB<U, T_ID, T_Encoded, DexieCustom, T_Idx, T_IdxAnyOf>>,
) {
    const { selectByIdSingle, selectByIdMany, selectAll, selectWhere } = crudSelectors;
    const { get, bulkGet, all, where, whereAnyOf, anyOf } = crudDB;

    /** Dexie Hooks */
    const useGet = (idx: Partial<T_Idx> | string | undefined) => {
        const defined = isDefined(idx);
        const dep = defined ? JSON.stringify(idx) : undefined;

        //@ts-expect-error
        const response = useLiveQuery(() => (defined ? get(idx) : undefined), [dep], "loading" as const);
        const isLoading = response === "loading";
        const result = isLoading ? undefined : response;
        const exists = !!result; //false while loading
        const returnOptions = { isLoading, exists };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };
    //TODO: string array id
    const useGetBulk = (ids: Partial<T_ID>[] | string[] | undefined) => {
        const response = useLiveQuery(
            () => {
                if (ids) {
                    const ids2 = (ids as (Partial<T_ID> | string)[]).filter((id) => {
                        return isDefined(id);
                    }) as T_ID[] | string[];
                    return bulkGet(ids2);
                }
                return [];
            },
            [JSON.stringify(ids)],
            "loading" as const,
        );
        const isLoading = response === "loading";
        const result = isLoading ? [] : response;
        const returnOptions = { isLoading };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };

    const useAll = () => {
        const response = useLiveQuery(all, [], "loading");
        const isLoading = response === "loading";
        const result = isLoading ? [] : response;
        const exists = !!result; //false while loading
        const returnOptions = { isLoading, exists };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };

    const useWhere = (filter: T_Idx | undefined, options?: { reverse?: boolean; offset?: number; limit?: number }) => {
        const filterDep = JSON.stringify(filter);
        const response = useLiveQuery(
            () => (filter && isDefinedRecord(filter) ? where(filter, options) : []),
            [filterDep, options?.reverse, options?.limit, options?.offset],
            "loading" as const,
        );

        const isLoading = response === "loading";
        const result = isLoading ? [] : response;
        const returnOptions = { isLoading };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };

    const useWhereAnyOf = (
        filter: T_IdxAnyOf | undefined,
        options?: { reverse?: boolean; offset?: number; limit?: number },
    ) => {
        const filterDep = JSON.stringify(filter);
        const response = useLiveQuery(
            () => (filter && isDefinedRecord(filter) ? whereAnyOf(filter, options) : []),
            [filterDep, options?.reverse, options?.limit, options?.offset],
            "loading" as const,
        );

        const isLoading = response === "loading";
        const result = isLoading ? [] : response;
        const returnOptions = { isLoading };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };

    const useWhereMany = (
        queries: T_Idx[] | undefined,
        options?: { reverse?: boolean; offset?: number; limit?: number },
    ) => {
        const dep = JSON.stringify(queries);
        const response = useLiveQuery(
            async () => {
                return Promise.all(
                    (queries ?? []).map((filter) => {
                        const result = filter && isDefinedRecord(filter) ? where(filter, options) : ([] as T_Encoded[]);
                        return result;
                    }),
                );
            },
            [dep, options?.reverse, options?.limit, options?.offset],
            "loading" as const,
        );

        const isLoading = response === "loading";
        const result = isLoading ? [] : response;
        const returnOptions = { isLoading };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };

    const useAnyOf = (index: string, keys: string | string[] | undefined) => {
        const response = useLiveQuery(
            () => {
                if (!keys) return [];
                return anyOf(index, keys);
            },
            [index, JSON.stringify(keys)],
            "loading",
        );

        const isLoading = response === "loading";
        const result = isLoading ? [] : response;
        const exists = !!result; //false while loading
        const returnOptions = { isLoading, exists };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };

    /** Redux ORM Hooks */
    const useSelectByIdSingle = (id: Partial<T_ID> | string | undefined) => {
        return useSelector((state) => selectByIdSingle(state, id));
    };
    const useSelectByIdMany = (id?: T_ID[] | string[]) => {
        return useSelector((state) => selectByIdMany(state, id));
    };
    const useSelectAll = () => {
        return useSelector((state) => selectAll(state));
    };
    const useSelectWhere = (f: Partial<T_Encoded>) => {
        return useSelector((state) => selectWhere(state, f));
    };

    const hooks = {
        useGet,
        useGetBulk,
        useAll,
        useWhere,
        useWhereAnyOf,
        useWhereMany,
        useAnyOf,
        useSelectByIdSingle,
        useSelectByIdMany,
        useSelectAll,
        useSelectWhere,
    };

    return hooks;
}
