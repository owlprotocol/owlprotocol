import { name } from './common.js';
import {
    ConfigId,
    Config,
    hydrate,
    ConfigWithObjects,
    encode,
    toPrimaryKey,
    validateId,
    validate,
} from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';
import { getOrm } from '../orm.js';

export const ConfigCRUD = createCRUDModel<
    typeof name,
    ConfigId,
    Config,
    ConfigWithObjects,
    ConfigId,
    Web3ReduxDexie
>(name, getDB, {
    hydrate,
    encode,
    validateId,
    toPrimaryKey,
    validate,
}, getOrm());
export default ConfigCRUD;
