import { IndexableType, IndexableTypeArrayReadonly } from 'dexie';
import { omitBy, isUndefined } from 'lodash-es';

import { toReduxOrmId } from '../utils/index.js';
import { T_Encoded_Base } from './model.js';

/**
 *
 * Creates common CRUD Validators
 *
 * @param name
 * @param validators Validators used to sanitize data
 *      @param validateId Validate id to Dexie-supported format. Defaults to calling object values.
 *      @param validate Validate item that will be inserted computing any default values. Defaults to identity function.
 *      @param hydrate Instantiate objects that are not encoded in Dexie.
 *      @param encode Encode an hydrated object to be inserted stripping out objects.
 * @returns
 */
export function createCRUDValidators<
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends (T_ID & T_Encoded_Base) = T_ID & T_Encoded_Base,
    T extends T_Encoded = T_Encoded,
>(
    validators?: {
        validateId?: (id: T_ID) => T_ID;
        validate?: (item: T) => T;
        hydrate?: (item: T, sess?: any) => T;
        encode?: (item: T) => T_Encoded;
        toPrimaryKey?: (id: T_ID) => IndexableType;
    },
) {
    const validateId = validators?.validateId ?? ((id: T_ID) => omitBy(id, isUndefined) as T_ID);
    const validate = validators?.validate ?? ((item: T) => omitBy(item, isUndefined) as T);
    const hydrate = validators?.hydrate ?? ((item: T) => omitBy(item, isUndefined) as T);
    const encode = validators?.encode ?? ((item: T) => omitBy(item, isUndefined) as T_Encoded);
    const toPrimaryKey =
        validators?.toPrimaryKey ??
        ((id: T_ID) => {
            const values = Object.values(id) as IndexableTypeArrayReadonly;
            if (values.length == 1) return values[0];
            return values;
        });

    const toPrimaryKeyString = (id: T_ID | string): string =>
        typeof id === 'string' ? id : toReduxOrmId(toPrimaryKey(id));

    return {
        validateId,
        validate,
        hydrate,
        encode,
        toPrimaryKey,
        toPrimaryKeyString
    }
}
