import { AnyAction } from "redux";
import { call, put } from "typed-redux-saga";
import { v4 as uuidv4 } from "uuid";
import { createReduxError as createError } from "../actions/index.js";

interface AnyActionWithId extends AnyAction {
    meta?: {
        uuid: string;
        [k: string]: any;
    };
}

export function wrapSagaWithErrorHandler<T extends AnyActionWithId = AnyActionWithId>(
    saga: (action: T) => Generator<any, any, any>,
    name?: string,
) {
    return function* (action: T) {
        try {
            yield* call(saga, action);
        } catch (error) {
            const uuid = action.meta?.uuid ?? uuidv4();
            const err = error as Error;
            yield* put(
                createError(
                    {
                        id: uuid,
                        errorMessage: err.message,
                        stack: err.stack,
                        type: name ? `${name}/ERROR` : "ERROR",
                    },
                    uuid,
                ),
            );
        }
    };
}
