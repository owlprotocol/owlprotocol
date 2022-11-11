import { BaseSyncId, Sync, SyncIndexInput, validate, validateId } from './model/index.js';
import { name } from './common.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import getDB, { Web3ReduxDexie } from '../db.js';

export const SyncCRUD = createCRUDModel<
    typeof name,
    BaseSyncId,
    Sync,
    Sync,
    SyncIndexInput,
    Web3ReduxDexie
>(name, getDB, {
    validateId,
    validate
});
export default SyncCRUD;
