import { v4 as uuidv4 } from 'uuid';
import type { Action } from '@reduxjs/toolkit';
import { isUndefined, omitBy, pick } from 'lodash-es';

import { createCRUDValidators } from './createCRUDValidators.js'
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
    validators: ReturnType<typeof createCRUDValidators<T_ID, T_Encoded, T>>
) {
    const { validateId, validate } = validators;

    /** Actions */
    const FETCH = `${name}/FETCH`;
    const FETCH_BATCHED = `${FETCH}/BATCHED`;
    //const FETCH_ALL = `${FETCH}/ALL`;

    //(name)_CRUD_(BATCHED) Actions Write to IndexedDB
    //(CRUD)_POST actions send notifications once action is complete and can be used by other workers
    const CREATE = `${name}/CREATE`;
    const CREATE_POST = `${CREATE}/POST`;
    const CREATE_BATCHED = `${CREATE}/BATCHED`;
    const CREATE_BATCHED_POST = `${CREATE_BATCHED}/POST`;

    const PUT = `${name}/PUT`;
    const PUT_POST = `${PUT}/POST`;
    const PUT_BATCHED = `${PUT}/BATCHED`;
    const PUT_BATCHED_POST = `${PUT_BATCHED}/POST`;

    const UPDATE = `${name}/UPDATE`;
    const UPDAET_POST = `${UPDATE}/POST`;
    const UPDATE_BATCHED = `${UPDATE}/BATCHED`;
    const UPDATE_BATCHED_POST = `${UPDATE_BATCHED}/POST`;

    const UPSERT = `${name}/UPSERT`;
    const UPSERT_POST = `${UPSERT}/POST`;
    const UPSERT_BATCHED = `${UPSERT}/BATCHED`;
    const UPSERT_BATCHED_POST = `${UPSERT_BATCHED}/POST`;

    const DELETE = `${name}/DELETE`;
    const DELETE_POST = `${DELETE}/POST`;
    const DELETE_BATCHED = `${DELETE}/BATCHED`;
    const DELETE_BATCHED_POST = `${DELETE_BATCHED}/POST`;

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
    const createPostAction = createAction2(CREATE_POST, validate);
    const createBatchedPostAction = createAction2(CREATE_BATCHED_POST, (payload: T[]) => {
        return payload.map(validate)
    });

    const putAction = createAction2(PUT, validate);
    const putBatchedAction = createAction2(PUT_BATCHED, (payload: T[]) => {
        return payload.map(validate)
    });
    const putPostAction = createAction2(PUT_POST, validate);
    const putBatchedPostAction = createAction2(PUT_BATCHED_POST, (payload: T[]) => {
        return payload.map(validate)
    });

    const updateAction = createAction2(UPDATE, validate);
    const updateBatchedAction = createAction2(UPDATE_BATCHED, (payload: T[]) => {
        return payload.map(validate)
    });
    const updatePostAction = createAction2(UPDAET_POST, validate);
    const updateBatchedPostAction = createAction2(UPDATE_BATCHED_POST, (payload: T[]) => {
        return payload.map(validate)
    });

    const upsertAction = createAction2(UPSERT, validate);
    const upsertBatchedAction = createAction2(UPSERT_BATCHED, (payload: T[]) => {
        return payload.map(validate)
    });
    const upsertPostAction = createAction2(UPSERT_POST, validate);
    const upsertBatchedPostAction = createAction2(UPSERT_BATCHED_POST, (payload: T[]) => {
        return payload.map(validate)
    });

    const deleteAction = createAction2(DELETE, validateId);
    const deleteBatchedAction = createAction2(DELETE_BATCHED, (payload: T_ID[]) => {
        return payload.map(validateId)
    });
    const deletePostAction = createAction2(DELETE_POST, validateId);
    const deleteBatchedPostAction = createAction2(DELETE_BATCHED_POST, (payload: T_ID[]) => {
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
        CREATE_POST,
        CREATE_BATCHED,
        CREATE_BATCHED_POST,
        PUT,
        PUT_POST,
        PUT_BATCHED,
        PUT_BATCHED_POST,
        UPDATE,
        UPDAET_POST,
        UPDATE_BATCHED,
        UPDATE_BATCHED_POST,
        UPSERT,
        UPSERT_POST,
        UPSERT_BATCHED,
        UPSERT_BATCHED_POST,
        DELETE,
        DELETE_POST,
        DELETE_BATCHED,
        DELETE_BATCHED_POST,
        HYDRATE,
        HYDRATE_BATCHED,
        HYDRATE_ALL,
    };

    const actions = {
        fetch: fetchAction,
        fetchBatch: fetchBatchAction,
        create: createAction,
        createPost: createPostAction,
        createBatched: createBatchedAction,
        createBatchedPost: createBatchedPostAction,
        put: putAction,
        putPost: putPostAction,
        putBatched: putBatchedAction,
        putBatchedPost: putBatchedPostAction,
        update: updateAction,
        updatePost: updatePostAction,
        updateBatched: updateBatchedAction,
        updateBatchedPost: updateBatchedPostAction,
        upsert: upsertAction,
        upsertPost: upsertPostAction,
        upsertBatched: upsertBatchedAction,
        upsertBatchedPost: upsertBatchedPostAction,
        delete: deleteAction,
        deletePost: deletePostAction,
        deleteBatched: deleteBatchedAction,
        deleteBatchedPost: deleteBatchedPostAction,
        hydrate: hydrateAction,
        hydrateBatched: hydrateBatchedAction,
        hydrateAll: hydrateAllAction,
    };

    const isPostAction = (action: Action) => {
        return (
            actions.createPost.match(action) ||
            actions.createBatchedPost.match(action) ||
            actions.putPost.match(action) ||
            actions.putBatchedPost.match(action) ||
            actions.updatePost.match(action) ||
            actions.updateBatchedPost.match(action) ||
            actions.upsertPost.match(action) ||
            actions.upsertBatchedPost.match(action) ||
            actions.deletePost.match(action) ||
            actions.deleteBatchedPost.match(action)
        );
    }

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
            HYDRATE_ALL === action.type ||
            isPostAction(action)
        );
    };

    return {
        actions,
        actionTypes,
        isAction,
        isPostAction
    };
}
