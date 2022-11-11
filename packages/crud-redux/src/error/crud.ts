import { name } from './common.js';
import { ReduxErrorId, ReduxErrorModel } from './model/index.js';
import { createCRUDModel } from '../crud/createCRUDModel.js';
import { CrudDexie, getDB } from '../db.js';

export const ReduxErrorCRUD = createCRUDModel<
    typeof name,
    ReduxErrorId,
    ReduxErrorModel,
    ReduxErrorModel,
    ReduxErrorId,
    CrudDexie
>(name, getDB);
