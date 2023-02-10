import { createSelector } from 'redux-orm';
import { filter } from 'lodash-es';

import { isDefinedRecord } from '../utils/index.js';
import { T_Encoded_Base } from './model.js';
import { createCRUDValidators } from './createCRUDValidators.js';

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
    T_Encoded extends (T_ID & T_Encoded_Base) = T_ID & T_Encoded_Base,
    T extends T_Encoded = T_Encoded,
>(
    name: U,
    validators: ReturnType<typeof createCRUDValidators<T_ID, T_Encoded, T>>,
    orm?: any
) {

    const { toPrimaryKeyString } = validators;

    /** Redux ORM Selectors */
    //Only create selectors if orm model defined
    const ormModel = orm ? orm[name] : undefined;
    const select = ormModel ? createSelector(ormModel) : () => undefined;
    const selectByIdSingle = (state: any, id: Partial<T_ID> | string | undefined): T | undefined => {
        if (!id) return undefined;
        if (typeof id != 'string' && !isDefinedRecord(id)) return undefined;
        return select(state, toPrimaryKeyString(id));
    };

    const selectByIdMany = (state: any, ids?: T_ID[] | string[]): (T | null)[] => {
        if (!ids) return select(state); //Return all
        return select(state, ids.map(toPrimaryKeyString));
    };

    const selectAll = (state: any): T[] => {
        return select(state);
    };

    const selectWhere = (state: any, f: Partial<T_Encoded>) => {
        const all = selectByIdMany(state);
        return filter(all, f) as T_Encoded[];
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
