import { name } from './common.js';
import { HTTPCacheId, HTTPCache, toPrimaryKey, validate, validateId } from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';

export const HTTPCacheCRUD = createCRUDModel<
    typeof name,
    HTTPCacheId,
    HTTPCache,
    HTTPCache,
    HTTPCache,
    Web3ReduxDexie
>(name, getDB, {
    validateId,
    toPrimaryKey,
    validate,
});
