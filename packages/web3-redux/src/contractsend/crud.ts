import { name } from './common.js';
import { ContractSendId, ContractSend, validateId, validate } from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';

export const ContractSendCRUD = createCRUDModel<
    typeof name,
    ContractSendId,
    ContractSend,
    ContractSend,
    ContractSend,
    Web3ReduxDexie
>(
    name,
    getDB,
    {
        validateId,
        validate,
    },
);
export default ContractSendCRUD;
