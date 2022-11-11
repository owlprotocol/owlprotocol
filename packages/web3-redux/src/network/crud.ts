import { name } from './common.js';
import {
    NetworkId,
    Network,
    validate,
    hydrate,
    encode,
    NetworkWithObjects,
    validateId,
    toPrimaryKey,
} from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';
import { getOrm } from '../orm.js';

export const NetworkCRUD = createCRUDModel<
    typeof name,
    NetworkId,
    Network,
    NetworkWithObjects,
    NetworkId,
    Web3ReduxDexie
>(name, getDB, {
    validateId,
    toPrimaryKey,
    validate,
    hydrate,
    encode,
}, getOrm());
export default NetworkCRUD;
