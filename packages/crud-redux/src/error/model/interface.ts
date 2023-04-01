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
export function validateId({ id }: ReduxErrorId) {
    return { id };
}

export function toPrimaryKey({ id }: ReduxErrorId): [string] {
    return [id];
}

/** @internal */
export function validate(item: ReduxError): ReduxError {
    return item as ReduxError;
}
