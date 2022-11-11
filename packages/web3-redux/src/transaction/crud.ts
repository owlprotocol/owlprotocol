import { name } from './common.js';
import {
    TransactionId,
    Transaction,
    validate,
    TransactionIndexInput,
    validateId,
    toPrimaryKey,
} from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';

export const TransactionCRUD = createCRUDModel<
    typeof name,
    TransactionId,
    Transaction,
    Transaction,
    TransactionIndexInput,
    Web3ReduxDexie
>(name, getDB, { validate, validateId, toPrimaryKey });
export default TransactionCRUD;
