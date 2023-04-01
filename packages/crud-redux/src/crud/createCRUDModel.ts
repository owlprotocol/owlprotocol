import { IndexableTypeArrayReadonly } from "dexie";
import Dexie from "dexie";
import type { BroadcastChannel } from "broadcast-channel";

import { createCRUDActions } from "./createCRUDActions.js";

import { createCRUDValidators } from "./createCRUDValidators.js";
import { createCRUDReducer } from "./createCRUDReducer.js";
import { createCRUDSelectors } from "./createCRUDSelectors.js";
import { createCRUDDB } from "./createCRUDDB.js";
import { createCRUDSagas } from "./createCRUDSagas.js";
import { createCRUDHooks } from "./createCRUDHooks.js";

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

export interface CRUDModel<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends T_ID = T_ID,
    DexieCustom extends Dexie = Dexie,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T_Idx = T_ID,
    T_Partial = T_Encoded,
    T_Redux = T_Encoded,
> {
    name: U;
    getDB: () => DexieCustom;
    validators: {
        validateId: (id: T_ID) => T_ID;
        validate?: (item: T_Partial) => T_Encoded;
        preWriteBulkDB?: (item: T_Encoded[]) => Promise<T_Encoded[]>;
        postWriteBulkDB?: (item: T_Encoded[]) => Promise<any>;
        validateWithRedux?: (item: T_Encoded | T_Redux, sess: any) => T_Redux;
        encode?: (item: T_Redux) => T_Encoded;
        toPrimaryKey: (id: T_ID) => IndexableTypeArrayReadonly;
    };
    orm?: any;
    channel?: BroadcastChannel;
    tables?: string[];
}
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
    T_Encoded extends T_ID = T_ID,
    DexieCustom extends Dexie = Dexie,
    T_Idx = T_ID,
    T_IdxAnyOf = T_Idx,
    T_Partial = T_Encoded,
    T_Redux = T_Encoded,
>({
    name,
    getDB,
    validators,
    orm,
    //channel,
    tables,
}: CRUDModel<U, T_ID, T_Encoded, DexieCustom, T_Idx, T_Partial, T_Redux>) {
    //Model Validators
    const crudValidators = createCRUDValidators<T_ID, T_Encoded, T_Partial, T_Redux>(validators);
    //Redux Actions
    const crudActions = createCRUDActions<U, T_ID, T_Encoded, T_Partial, T_Redux>(name, crudValidators);
    //Redux ORM Reducer
    const crudReducer = createCRUDReducer<U, T_ID, T_Encoded, T_Partial, T_Redux>(name, crudValidators, crudActions);
    //Redux ORM Selectors
    const crudSelectors = createCRUDSelectors<U, T_ID, T_Encoded, T_Redux>(name, crudValidators, orm);
    //Dexie Getters
    const crudDB = createCRUDDB<U, T_ID, T_Encoded, DexieCustom, T_Idx, T_IdxAnyOf>(
        name,
        getDB,
        crudValidators,
        tables ?? [],
    );
    //Dexie Sagas
    const crudSagas = createCRUDSagas<U, T_ID, T_Encoded, T_Partial, T_Redux>(crudActions, crudDB);
    //Dexie Hooks
    const crudHooks = createCRUDHooks<U, T_ID, T_Encoded, DexieCustom, T_Idx, T_IdxAnyOf, T_Partial, T_Redux>(
        crudValidators,
        crudActions,
        crudSelectors,
        crudDB,
    );

    const model = {
        name,
        ...crudValidators,
        ...crudActions,
        reducer: crudReducer,
        selectors: crudSelectors,
        db: crudDB,
        sagas: crudSagas,
        hooks: crudHooks,
    };

    return model;
}
