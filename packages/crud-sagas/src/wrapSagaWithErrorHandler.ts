import { AnyAction } from "redux";
import { call, put } from "typed-redux-saga";
import { v4 as uuidv4 } from "uuid";
import { ReduxErrorCRUDActions } from "@owlprotocol/crud-actions";

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
                ReduxErrorCRUDActions.actions.create(
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
