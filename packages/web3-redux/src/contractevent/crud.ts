import { name } from './common.js';
import {
    ContractEventId,
    ContractEvent,
    validate,
    ContractEventIndexInput,
    validateId,
    toPrimaryKey,
} from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';

export const ContractEventCRUD = createCRUDModel<
    typeof name,
    ContractEventId,
    ContractEvent,
    ContractEvent,
    ContractEventIndexInput,
    Web3ReduxDexie
>(name, getDB, { validate, validateId, toPrimaryKey });
export default ContractEventCRUD;
