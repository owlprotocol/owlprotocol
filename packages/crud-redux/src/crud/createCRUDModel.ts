import { IndexableType } from 'dexie';
import Dexie from 'dexie';
import type { BroadcastChannel } from 'broadcast-channel';

import { createCRUDActions } from './createCRUDActions.js';
import { T_Encoded_Base } from './model.js';
import { createCRUDValidators } from './createCRUDValidators.js';
import { createCRUDReducer } from './createCRUDReducer.js';
import { createCRUDSelectors } from './createCRUDSelectors.js';
import { createCRUDDB } from './createCRUDDB.js';
import { createCRUDSagas } from './createCRUDSagas.js';
import { createCRUDHooks } from './createCRUDHooks.js';


/**
 * Combie createCRUD* functions to create a full model
 * - Validators
 * - Actions
 * - Middleware
 * - Reducer (Redux)
 * - Selectors (Redux)
 * - DB Getters (Dexie)
 * - Sagas (Dexie)
 * - Hooks (Redux + React + Actiosn)
 */
/**
 *
 * Creates common CRUD actions for a Redux/Dexie model including relevant action creators & sagas.
 * Automatically infers types.
 *
 * @param name
 * @param validators Validators used to sanitize data
 *      @param validateId Validate id to Dexie-supported format. Defaults to calling object values.
 *      @param validate Validate item that will be inserted computing any default values. Defaults to identity function.
 *      @param hydrate Instantiate objects that are not encoded in Dexie.
 *      @param encode Encode an hydrated object to be inserted stripping out objects.
 * @returns
 */
export function createCRUDModel<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends (T_ID & T_Encoded_Base) = T_ID & T_Encoded_Base,
    T extends T_Encoded = T_Encoded,
    T_Idx = T_ID,
    DB extends Dexie = Dexie,
>(
    name: U,
    getDB: () => DB,
    validators?: {
        validateId?: (id: T_ID) => T_ID;
        validate?: (item: T) => T;
        hydrate?: (item: T, sess?: any) => T;
        encode?: (item: T) => T_Encoded;
        toPrimaryKey?: (id: T_ID) => IndexableType;
    },
    orm?: any,
    channel?: BroadcastChannel
) {

    //Model Validators
    const crudValidators = createCRUDValidators<T_ID, T_Encoded, T>(validators)
    //Redux Actions
    const crudActions = createCRUDActions<U, T_ID, T_Encoded, T_Encoded, T_Idx>(name, crudValidators)
    //Redux ORM Reducer
    const crudReducer = createCRUDReducer<U, T_ID, T_Encoded, T_Encoded, T_Idx>(name, crudValidators, crudActions)
    //Redux ORM Selectors
    const crudSelectors = createCRUDSelectors<U, T_ID, T_Encoded, T>(name, crudValidators, orm)
    //Dexie Getters
    const crudDB = createCRUDDB<U, T_ID, T_Encoded, T, T_Idx, DB>(name, getDB, crudValidators)
    //Dexie Sagas
    const crudSagas = createCRUDSagas<U, T_ID, T_Encoded, T_Encoded, T_Idx>(crudValidators, crudActions, crudSelectors, crudDB, channel)
    //Dexie Hooks
    const crudHooks = createCRUDHooks<U, T_ID, T_Encoded, T_Encoded, T_Idx>(crudValidators, crudActions, crudSelectors, crudDB)

    const model = {
        name,
        ...crudValidators,
        ...crudActions,
        reducer: crudReducer,
        selectors: crudSelectors,
        db: crudDB,
        sagas: crudSagas,
        hooks: crudHooks
    }

    return model;
}
