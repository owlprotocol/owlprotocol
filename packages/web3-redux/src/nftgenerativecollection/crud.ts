import { name } from './common.js';
import {
    NFTGenerativeCollectionId,
    NFTGenerativeCollection,
    toPrimaryKey,
    validate,
    validateId,
    NFTGenerativeCollectionIndexInput,
} from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';

export const NFTGenerativeCollectionCRUD = createCRUDModel<
    typeof name,
    NFTGenerativeCollectionId,
    NFTGenerativeCollection,
    NFTGenerativeCollection,
    NFTGenerativeCollectionIndexInput,
    Web3ReduxDexie
>(name, getDB, {
    validateId,
    validate,
    toPrimaryKey,

});
