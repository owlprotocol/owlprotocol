import { name } from './common.js';
import { ContractInterfaceId, ContractInterface } from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';

export const ContractInterfaceCRUD = createCRUDModel<
    typeof name,
    ContractInterfaceId,
    ContractInterface,
    ContractInterface,
    ContractInterfaceId,
    Web3ReduxDexie
>(name, getDB);
