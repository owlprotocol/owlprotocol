import { name } from './common.js';
import { BlockId, BlockTransaction, toPrimaryKey, validateId } from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';
import { Block } from 'web3-eth';

export const BlockCRUD = createCRUDModel<
    typeof name,
    BlockId,
    BlockTransaction,
    BlockTransaction,
    BlockId,
    Web3ReduxDexie
>(name, getDB, {
    validateId,
    toPrimaryKey,
});
export default BlockCRUD;
