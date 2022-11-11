import { name } from './common.js';
import {
    NFTGenerativeItemId,
    NFTGenerativeItem,
    toPrimaryKey,
    validate,
    validateId,
    NFTGenerativeItemIndexInput,
} from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';

export const NFTGenerativeItemCRUD = createCRUDModel<
    typeof name,
    NFTGenerativeItemId,
    NFTGenerativeItem,
    NFTGenerativeItem,
    NFTGenerativeItemIndexInput,
    Web3ReduxDexie
>(name, getDB, {
    validateId,
    validate,
    toPrimaryKey,
});
