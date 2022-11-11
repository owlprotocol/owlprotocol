import { name } from './common.js';
import {
    ContractEventQueryId,
    ContractEventQuery,
    validate,
    ContractEventIndexInput,
    validateId,
    toPrimaryKey,
} from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';

export const ContractEventQueryCRUD = createCRUDModel<
    typeof name,
    ContractEventQueryId,
    ContractEventQuery,
    ContractEventQuery,
    ContractEventIndexInput,
    Web3ReduxDexie
>(name, getDB, { validate, validateId, toPrimaryKey });
export default ContractEventQueryCRUD;
