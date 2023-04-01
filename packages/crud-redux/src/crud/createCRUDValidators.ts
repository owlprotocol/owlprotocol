import { IndexableType, IndexableTypeArrayReadonly, IndexableTypePart } from "dexie";
import { omitBy, isUndefined } from "lodash-es";

import { toReduxOrmId } from "../utils/index.js";

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
    T_Encoded extends T_ID = T_ID,
    T_Partial = T_Encoded,
    T_Redux = T_Encoded,
>(validators?: {
    validateId?: (id: T_ID) => T_ID;
    validate?: (item: T_Partial) => T_Encoded;
    preWriteBulkDB?: (item: T_Encoded[]) => Promise<T_Encoded[]>;
    postWriteBulkDB?: (item: T_Encoded[]) => Promise<any>;
    validateWithRedux?: (item: T_Encoded | T_Redux, sess: any) => T_Redux;
    encode?: (item: T_Redux) => T_Encoded;
    toPrimaryKey?: (id: T_ID) => IndexableTypeArrayReadonly;
}) {
    const validateId = validators?.validateId ?? ((id: T_ID) => omitBy(id, isUndefined) as T_ID);
    const validate = validators?.validate ?? ((item: T_Partial) => omitBy(item as any, isUndefined) as T_Encoded);
    const preWriteBulkDB = validators?.preWriteBulkDB ?? ((items: T_Encoded[]) => Promise.resolve(items));
    const postWriteBulkDB = validators?.postWriteBulkDB ?? (() => Promise.resolve());
    const validateWithRedux =
        validators?.validateWithRedux ?? ((item: T_Encoded | T_Redux) => omitBy(item as any, isUndefined) as T_Redux);
    const encode = validators?.encode ?? ((item: T_Redux) => omitBy(item as any, isUndefined) as T_Encoded);

    const toPrimaryKeyInternal = function (id: T_ID): IndexableType {
        const toPrimaryKey = validators?.toPrimaryKey ?? Object.values;
        const values = toPrimaryKey(id) as IndexableTypeArrayReadonly;
        if (Array.isArray(values) && values.length == 1) return values[0] as IndexableTypePart;
        return values as IndexableTypeArrayReadonly;
    };
    const toPrimaryKey = (id: T_ID) => {
        return toPrimaryKeyInternal(validateId(id));
    };

    const toPrimaryKeyString = (id: T_ID | string): string =>
        typeof id === "string" ? id : toReduxOrmId(toPrimaryKey(id));

    return {
        validateId,
        validate,
        preWriteBulkDB,
        postWriteBulkDB,
        validateWithRedux,
        encode,
        toPrimaryKey,
        toPrimaryKeyString,
    };
}
