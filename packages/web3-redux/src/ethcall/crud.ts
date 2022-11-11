import { name } from './common.js';
import { EthCallId, EthCall, validateId, validate, EthCallIndexInput, toPrimaryKey } from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';

export const EthCallCRUD = createCRUDModel<
    typeof name,
    EthCallId,
    EthCall,
    EthCall,
    EthCallIndexInput,
    Web3ReduxDexie
>(name, getDB, {
    validateId,
    validate,
    toPrimaryKey,
});
export default EthCallCRUD;
