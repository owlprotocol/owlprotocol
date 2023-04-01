import {
    Dexie,
    Collection,
    DBCoreTable,
    IndexableType,
    IndexableTypePart,
    PromiseExtended,
    TableHooks,
    TableSchema,
    ThenShortcut,
} from "dexie";

export interface CRUDWhereClause<T = any, TKey = IndexableType, TKeyIdx = IndexableType> {
    above(key: TKeyIdx extends string | number | Date ? TKeyIdx : never): Collection<T, TKey>;
    aboveOrEqual(key: TKeyIdx extends string | number | Date ? TKeyIdx : never): Collection<T, TKey>;
    anyOf(keys: ReadonlyArray<TKeyIdx>): Collection<T, TKey>;
    anyOf(...keys: Array<TKeyIdx>): Collection<T, TKey>;
    anyOfIgnoreCase(keys: TKeyIdx extends string ? TKeyIdx[] : never): Collection<T, TKey>;
    anyOfIgnoreCase(...keys: TKeyIdx extends string ? TKeyIdx[] : never): Collection<T, TKey>;
    below(key: TKeyIdx extends string | number | Date ? TKeyIdx : never): Collection<T, TKey>;
    belowOrEqual(key: TKeyIdx extends string | number | Date ? TKeyIdx : never): Collection<T, TKey>;
    between(
        lower: TKeyIdx extends string | number | Date ? TKeyIdx : never,
        upper: TKeyIdx extends string | number | Date ? TKeyIdx : never,
        includeLower?: boolean,
        includeUpper?: boolean,
    ): Collection<T, TKey>;
    equals(key: TKeyIdx): Collection<T, TKey>;
    equalsIgnoreCase(key: TKeyIdx extends string ? TKeyIdx : never): Collection<T, TKey>;
    inAnyRange(
        ranges: TKeyIdx extends string | number | Date
            ? ReadonlyArray<{
                  0: TKeyIdx;
                  1: TKeyIdx;
              }>
            : never,
        options?: {
            includeLowers?: boolean;
            includeUppers?: boolean;
        },
    ): Collection<T, TKey>;
    startsWith(key: TKeyIdx extends string ? TKeyIdx : never): Collection<T, TKey>;
    startsWithAnyOf(prefixes: TKeyIdx extends string ? TKeyIdx[] : never): Collection<T, TKey>;
    startsWithAnyOf(...prefixes: TKeyIdx extends string ? TKeyIdx[] : never): Collection<T, TKey>;
    startsWithIgnoreCase(key: TKeyIdx extends string ? TKeyIdx : never): Collection<T, TKey>;
    startsWithAnyOfIgnoreCase(prefixes: TKeyIdx extends string ? TKeyIdx[] : never): Collection<T, TKey>;
    startsWithAnyOfIgnoreCase(...prefixes: TKeyIdx extends string ? TKeyIdx[] : never): Collection<T, TKey>;
    noneOf(keys: ReadonlyArray<TKey>): Collection<T, TKey>;
    notEqual(key: TKeyIdx): Collection<T, TKey>;
}

export interface CRUDTable<
    T = any,
    TKeyId = IndexableType,
    TKeyIdEq = Record<string, IndexableTypePart>,
    TKeyIdx = Record<string, IndexableType>,
    TKeyIdxEq = Record<string, IndexableTypePart>,
> {
    db: Dexie;
    name: string;
    schema: TableSchema;
    hook: TableHooks<T, TKeyId>;
    core: DBCoreTable;
    get(key: TKeyId): PromiseExtended<T | undefined>;
    get<R>(key: TKeyId, thenShortcut: ThenShortcut<T | undefined, R>): PromiseExtended<R>;
    get(equalityCriterias: TKeyIdEq): PromiseExtended<T | undefined>;
    get<R>(equalityCriterias: TKeyIdEq, thenShortcut: ThenShortcut<T | undefined, R>): PromiseExtended<R>;
    where<K extends keyof TKeyIdx>(index: K): CRUDWhereClause<T, TKeyId, TKeyIdx[K]>;
    where(equalityCriterias: TKeyIdxEq): Collection<T, TKeyId>;
    filter(fn: (obj: T) => boolean): Collection<T, TKeyId>;
    count(): PromiseExtended<number>;
    count<R>(thenShortcut: ThenShortcut<number, R>): PromiseExtended<R>;
    offset(n: number): Collection<T, TKeyId>;
    limit(n: number): Collection<T, TKeyId>;
    each(
        callback: (
            obj: T,
            cursor: {
                key: any;
                primaryKey: TKeyId;
            },
        ) => any,
    ): PromiseExtended<void>;
    toArray(): PromiseExtended<Array<T>>;
    toArray<R>(thenShortcut: ThenShortcut<T[], R>): PromiseExtended<R>;
    toCollection(): Collection<T, TKeyId>;
    orderBy<K extends keyof TKeyIdx>(index: K): Collection<T, TKeyId>;
    reverse(): Collection<T, TKeyId>;
    // eslint-disable-next-line @typescript-eslint/ban-types
    mapToClass(constructor: Function): Function;
    add(item: T, key?: TKeyId): PromiseExtended<TKeyId>;
    update(key: TKeyId, changes: Partial<T>): PromiseExtended<number>;
    put(item: T, key?: TKeyId): PromiseExtended<TKeyId>;
    delete(key: TKeyId): PromiseExtended<void>;
    clear(): PromiseExtended<void>;
    bulkGet(keys: TKeyId[]): PromiseExtended<(T | undefined)[]>;
    bulkAdd<B extends boolean>(
        items: readonly T[],
        keys: TKeyId[],
        options: {
            allKeys: B;
        },
    ): PromiseExtended<B extends true ? TKeyId[] : TKeyId>;
    bulkAdd<B extends boolean>(
        items: readonly T[],
        options: {
            allKeys: B;
        },
    ): PromiseExtended<B extends true ? TKeyId[] : TKeyId>;
    bulkAdd(
        items: readonly T[],
        keys?: TKeyId[],
        options?: {
            allKeys: boolean;
        },
    ): PromiseExtended<TKeyId>;
    bulkPut<B extends boolean>(
        items: readonly T[],
        keys: TKeyId[],
        options: {
            allKeys: B;
        },
    ): PromiseExtended<B extends true ? TKeyId[] : TKeyId>;
    bulkPut<B extends boolean>(
        items: readonly T[],
        options: {
            allKeys: B;
        },
    ): PromiseExtended<B extends true ? TKeyId[] : TKeyId>;
    bulkPut(
        items: readonly T[],
        keys?: TKeyId[],
        options?: {
            allKeys: boolean;
        },
    ): PromiseExtended<TKeyId>;
    bulkDelete(keys: TKeyId[]): PromiseExtended<void>;
}
