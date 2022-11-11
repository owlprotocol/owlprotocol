import { name } from './common.js';
import {
    ContractId,
    Contract,
    validateId,
    validate,
    ContractWithObjects,
    hydrate,
    encode,
    ContractIndexInput,
    toPrimaryKey,
} from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';
import { getOrm } from '../orm.js';

export const ContractCRUD = createCRUDModel<
    typeof name,
    ContractId,
    Contract,
    ContractWithObjects,
    ContractIndexInput,
    Web3ReduxDexie
>(
    name,
    getDB,
    {
        validateId,
        validate,
        toPrimaryKey,
        hydrate,
        encode,
    },
    getOrm()
);
export default ContractCRUD;
