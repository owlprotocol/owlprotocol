export const ReduxErrorName = "ReduxError";

export interface ReduxErrorId {
    readonly id: string;
}
/**
 * Store errors for dispatched actions
 */
export interface ReduxError extends ReduxErrorId {
    readonly id2?: string; //auto-generated
    readonly errorMessage?: string;
    readonly stack?: string;
    readonly type?: string;
}

//Hack
export const ReduxErrorIndex = "++id2,id,type";
export type ReduxErrorIndexInput = ReduxErrorId | { id: string } | { type: string };

export type ReduxErrorIndexInputAnyOf = ReduxErrorId | { id: string[] | string } | { type: string[] | string };

/** @internal */
export function validateIdReduxError({ id }: ReduxErrorId) {
    return { id };
}

export function toPrimaryKeyReduxError({ id }: ReduxErrorId): string {
    return id;
}

/** @internal */
export function validateReduxError(item: ReduxError): ReduxError {
    return item as ReduxError;
}
