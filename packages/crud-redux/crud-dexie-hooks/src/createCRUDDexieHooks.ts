import { useLiveQuery } from "dexie-react-hooks";
import { isDefinedRecord, isDefined } from "./utils/index.js";

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createCRUDDexieHooks<T, TKeyId, TKeyIdx, TKeyIdEq, TKeyIdxEq, TKeyIdxEqAny>(crudDB: {
    get: (id: TKeyIdEq) => Promise<T | undefined>;
    bulkGet: (ids: TKeyIdEq[]) => Promise<(T | undefined)[]>;
    all: () => Promise<T[]>;
    where: (filter: TKeyIdxEq, options?: { reverse?: boolean; offset?: number; limit?: number }) => Promise<T[]>;
    bulkWhere: (
        filter: TKeyIdxEq[],
        options?: { reverse?: boolean; offset?: number; limit?: number },
    ) => Promise<T[][]>;
    whereAnyOf: (
        filter: TKeyIdxEqAny,
        options?: { reverse?: boolean; offset?: number; limit?: number },
    ) => Promise<T[][]>;
    anyOf: (index: keyof TKeyIdx, keys: TKeyIdx[typeof index][]) => Promise<T[]>;
}) {
    const { get, bulkGet, all, where, whereAnyOf, anyOf } = crudDB;

    /** Dexie Hooks */
    const useGet = (id: Partial<TKeyIdEq> | undefined) => {
        const defined = isDefined(id);
        const dep = defined ? JSON.stringify(id) : undefined;

        //@ts-expect-error
        const response = useLiveQuery(() => (defined ? get(id) : undefined), [dep], "loading" as const);
        const isLoading = response === "loading";
        const result = isLoading ? undefined : response;
        const exists = !!result; //false while loading
        const returnOptions = { isLoading, exists };
        return [result, returnOptions] as [typeof result, typeof returnOptions];
    };
    //TODO: string array id
    const useGetBulk = (ids: Partial<TKeyIdEq>[] | undefined) => {
        const response = useLiveQuery(
            () => {
                if (ids) {
                    const ids2 = ids.filter((id) => {
                        return isDefined(id);
                    }) as TKeyIdEq[];
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

    const useWhere = (
        filter: TKeyIdxEq | undefined,
        options?: { reverse?: boolean; offset?: number; limit?: number },
    ) => {
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
        filter: TKeyIdxEqAny | undefined,
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
        queries: TKeyIdxEq[] | undefined,
        options?: { reverse?: boolean; offset?: number; limit?: number },
    ) => {
        const dep = JSON.stringify(queries);
        const response = useLiveQuery(
            async () => {
                return Promise.all(
                    (queries ?? []).map((filter) => {
                        const result = filter && isDefinedRecord(filter) ? where(filter, options) : ([] as T[]);
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

    const useAnyOf = (index: keyof TKeyIdx, keys: TKeyIdx[typeof index][] | undefined) => {
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

    const hooks = {
        useGet,
        useGetBulk,
        useAll,
        useWhere,
        useWhereAnyOf,
        useWhereMany,
        useAnyOf,
    };

    return hooks;
}
