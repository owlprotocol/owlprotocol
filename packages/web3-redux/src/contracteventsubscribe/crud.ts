import { name } from './common.js';
import { validate, validateId, toPrimaryKey, hydrate, ContractEventSubscribeId, ContractEventSubscribe, ContractEventSubscribeIndex, ContractEventSubscribeIndexInput, encode, ContractEventSubscribeWithObjects } from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import { getDB, Web3ReduxDexie } from '../db.js';
import { getOrm } from '../orm.js';

export const ContractEventSubscribeCRUD = createCRUDModel<
    typeof name,
    ContractEventSubscribeId,
    ContractEventSubscribe,
    ContractEventSubscribeWithObjects,
    ContractEventSubscribeIndexInput,
    Web3ReduxDexie
>(name, getDB, { validate, validateId, toPrimaryKey, encode, hydrate }, getOrm());
