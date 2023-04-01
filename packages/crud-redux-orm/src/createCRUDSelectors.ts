import { createSelector } from "redux-orm";
import { filter } from "lodash-es";

import { isDefinedRecord } from "./utils/index.js";

/**
 *
 * Creates common CRUD Selectors
 *
 * @param name
 * @param validators Validators used to sanitize data
 * @param orm redux-orm
 * @returns
 */
export function createCRUDSelectors<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends T_ID = T_ID,
    T_Redux = T_Encoded,
>(
    name: U,
    validators: {
        toPrimaryKeyString: (id: T_ID | string) => string;
    },
    orm?: any,
) {
    const { toPrimaryKeyString } = validators;

    /** Redux ORM Selectors */
    //Only create selectors if orm model defined
    const ormModel = orm ? orm[name] : undefined;
    const select = ormModel ? createSelector(ormModel) : () => undefined;
    const selectByIdSingle = (state: any, id: Partial<T_ID> | string | undefined): T_Redux | undefined => {
        if (!id) return undefined;
        if (typeof id != "string" && !isDefinedRecord(id)) return undefined;
        return select(state, toPrimaryKeyString(id));
    };

    const selectByIdMany = (state: any, ids?: T_ID[] | string[]): (T_Redux | null)[] => {
        if (!ids) return select(state); //Return all
        return select(state, ids.map(toPrimaryKeyString));
    };

    const selectAll = (state: any): T_Redux[] => {
        return select(state);
    };

    const selectWhere = (state: any, f: Partial<T_Encoded>) => {
        const all = selectByIdMany(state);
        return filter(all, f) as T_Redux[];
    };

    const selectors = {
        select,
        selectByIdSingle,
        selectByIdMany,
        selectWhere,
        selectAll,
    };

    return selectors;
}
