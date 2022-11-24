import { name } from './common.js';
import { validate, validateId, _4ByteSignature, _4ByteSignatureId } from './model/index.js';
import { createCRUDModel } from '@owlprotocol/crud-redux';
import { getDB, Web3ReduxDexie } from '../db.js';

export const _4ByteCRUD = createCRUDModel<
    typeof name,
    _4ByteSignatureId,
    _4ByteSignature,
    _4ByteSignature,
    _4ByteSignatureId,
    Web3ReduxDexie
>(name, getDB, { validate, validateId });
