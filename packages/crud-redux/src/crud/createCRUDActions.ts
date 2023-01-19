import { v4 as uuidv4 } from 'uuid';
import type { Action } from '@reduxjs/toolkit';
import { isUndefined, omitBy, pick } from 'lodash-es';

import { createAction as createReduxAction, createAction2 } from './createAction.js';
import { T_Encoded_Base } from './model.js';


/**
 *
 * Creates common CRUD actions for a Redux/Dexie model.
 * Automatically infers types.
 *
 * @param name
 * @param validators Validators used to sanitize data
 * @returns
 */
export function createCRUDActions<
    U extends string,
    T_ID extends Record<string, any> = Record<string, any>,
    T_Encoded extends (T_ID & T_Encoded_Base) = T_ID & T_Encoded_Base,
    T extends T_Encoded = T_Encoded,
    T_Idx = T_ID,
>(
    name: U,
    validators?: {
        validateId?: (id: T_ID) => T_ID;
        validate?: (item: T) => T;
    },
) {
    const validateId = validators?.validateId ?? ((id: T_ID) => id);
    const validate = validators?.validate ?? ((item: T) => item);

    /** Actions */
    const FETCH = `${name}/FETCH`;
    const FETCH_BATCHED = `${FETCH}/BATCHED`;
    //const FETCH_ALL = `${FETCH}/ALL`;
    const CREATE = `${name}/CREATE`;
    const CREATE_BATCHED = `${CREATE}/BATCHED`;
    const PUT = `${name}/PUT`;
    const PUT_BATCHED = `${PUT}/BATCHED`;
    const UPDATE = `${name}/UPDATE`;
    const UPDATE_BATCHED = `${UPDATE}/BATCHED`;
    const UPSERT = `${name}/UPSERT`;
    const UPSERT_BATCHED = `${UPSERT}/BATCHED`;
    const DELETE = `${name}/DELETE`;
    const DELETE_BATCHED = `${DELETE}/BATCHED`;
    //const DELETE_ALL = `${DELETE}/ALL`;
    const HYDRATE = `${name}/HYDRATE`;
    const HYDRATE_BATCHED = `${HYDRATE}/BATCHED`;
    const HYDRATE_ALL = `${HYDRATE}/ALL`;

    const fetchAction = createAction2(FETCH, (payload: (T_ID | T) & { maxCacheAge?: number }) => {
        //@ts-expect-error
        return { ...validate(payload), maxCacheAge: payload.maxCacheAge ?? 0 }
    });
    const fetchBatchAction = createAction2(FETCH_BATCHED, (payload:
        (T_ID & { maxCacheAge?: number })[] |
        (T_Encoded & { maxCacheAge?: number })[]
    ) => {
        //@ts-expect-error
        return payload.map(validate).map((item) => { return { ...item, maxCacheAge: payload.maxCacheAge ?? 0 } })
    })

    const createAction = createAction2(CREATE, validate);
    const createBatchedAction = createAction2(CREATE_BATCHED, (payload: T[]) => {
        return payload.map(validate)
    });
    const putAction = createAction2(PUT, validate);
    const putBatchedAction = createAction2(PUT_BATCHED, (payload: T[]) => {
        return payload.map(validate)
    });
    const updateAction = createAction2(UPDATE, validate);
    const updateBatchedAction = createAction2(UPDATE_BATCHED, (payload: T[]) => {
        return payload.map(validate)
    });
    const upsertAction = createAction2(UPSERT, validate);
    const upsertBatchedAction = createAction2(UPSERT_BATCHED, (payload: T[]) => {
        return payload.map(validate)
    });
    const deleteAction = createAction2(DELETE, validateId);
    const deleteBatchedAction = createAction2(DELETE_BATCHED, (payload: T_ID[]) => {
        return payload.map(validateId)
    });
    const hydrateAction = createReduxAction(
        HYDRATE,
        (payload: { id: T_Idx; defaultItem?: T_Encoded }, uuid?: string) => {
            //@ts-expect-error
            const idxKeys = Object.keys(payload.id);
            const idxValidate = validate(payload.id as unknown as T) as unknown as T_Idx;
            const defaultItemKeys = payload.defaultItem ? Object.keys(payload.defaultItem) : [];
            const defaultItemValidate = payload.defaultItem ? validate(payload.defaultItem as T) : {};
            const p = {
                id: pick(idxValidate, idxKeys) as T_Idx,
                defaultItem: payload.defaultItem ? pick(defaultItemValidate, defaultItemKeys) : undefined,
            };
            return {
                payload: omitBy(p, isUndefined) as unknown as typeof p,
                meta: {
                    uuid: uuid ?? uuidv4(),
                },
            };
        },
    );
    const hydrateBatchedAction = createReduxAction(HYDRATE_BATCHED, (payload: T_ID[], uuid?: string) => {
        return {
            payload: payload.map(validateId),
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    });
    const hydrateAllAction = (uuid?: string) => {
        return {
            type: HYDRATE_ALL,
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    };

    const actionTypes = {
        FETCH,
        FETCH_BATCHED,
        CREATE,
        CREATE_BATCHED,
        PUT,
        PUT_BATCHED,
        UPDATE,
        UPDATE_BATCHED,
        UPSERT,
        UPSERT_BATCHED,
        DELETE,
        DELETE_BATCHED,
        HYDRATE,
        HYDRATE_BATCHED,
        HYDRATE_ALL,
    };

    const actions = {
        fetch: fetchAction,
        fetchBatch: fetchBatchAction,
        create: createAction,
        createBatched: createBatchedAction,
        put: putAction,
        putBatched: putBatchedAction,
        update: updateAction,
        updateBatched: updateBatchedAction,
        upsert: upsertAction,
        upsertBatched: upsertBatchedAction,
        delete: deleteAction,
        deleteBatched: deleteBatchedAction,
        hydrate: hydrateAction,
        hydrateBatched: hydrateBatchedAction,
        hydrateAll: hydrateAllAction,
    };

    const isAction = (action: Action) => {
        return (
            actions.fetch.match(action) ||
            actions.fetchBatch.match(action) ||
            actions.create.match(action) ||
            actions.createBatched.match(action) ||
            actions.put.match(action) ||
            actions.putBatched.match(action) ||
            actions.update.match(action) ||
            actions.updateBatched.match(action) ||
            actions.upsert.match(action) ||
            actions.upsertBatched.match(action) ||
            actions.delete.match(action) ||
            actions.deleteBatched.match(action) ||
            actions.hydrate.match(action) ||
            actions.hydrateBatched.match(action) ||
            HYDRATE_ALL === action.type
        );
    };

    return {
        actions,
        actionTypes,
        isAction,
    };
}
