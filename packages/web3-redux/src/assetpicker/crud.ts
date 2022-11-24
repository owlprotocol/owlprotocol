import { name } from './common.js';
import { AssetPicker, AssetPickerId, toPrimaryKey, validate, validateId } from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import { getDB, Web3ReduxDexie } from '../db.js';

export const AssetPickerCRUD = createCRUDModel<
    typeof name,
    AssetPickerId,
    AssetPicker,
    AssetPicker,
    AssetPickerId,
    Web3ReduxDexie
>(name, getDB, { validate, validateId, toPrimaryKey });
