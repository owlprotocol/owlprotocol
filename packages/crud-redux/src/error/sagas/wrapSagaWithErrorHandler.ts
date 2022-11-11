import { Action } from 'redux';
import { call, put } from 'typed-redux-saga';
import { create as createError } from '../actions/index.js';

interface ActionWithId extends Action {
    meta: {
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
            const err = error as Error;
            yield* put(
                createError(
                    {
                        id: action.meta.uuid,
                        errorMessage: err.message,
                        stack: err.stack,
                        type: name ? `${name}/ERROR` : 'ERROR',
                    },
                    action.meta.uuid,
                ),
            );
        }
    };
}
