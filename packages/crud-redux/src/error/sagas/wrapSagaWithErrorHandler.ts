import { Action } from 'redux';
import { call, put } from 'typed-redux-saga';
import { v4 as uuidv4 } from 'uuid';
import { create as createError } from '../actions/index.js';

interface ActionWithId extends Action {
    meta?: {
        uuid: string;
    };
}

export function wrapSagaWithErrorHandler<T extends ActionWithId = ActionWithId>(
    saga: (action: T) => Generator<any, any, any>,
    name?: string,
) {
    return function* (action: T) {
        try {
            yield* call(saga, action);
        } catch (error) {
            const uuid = action.meta?.uuid ?? uuidv4()
            const err = error as Error;
            yield* put(
                createError(
                    {
                        id: uuid,
                        errorMessage: err.message,
                        stack: err.stack,
                        type: name ? `${name}/ERROR` : 'ERROR',
                    },
                    uuid,
                ),
            );
        }
    };
}
