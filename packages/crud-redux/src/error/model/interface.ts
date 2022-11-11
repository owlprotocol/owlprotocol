import { T_Encoded_Base } from "../../crud/model.js";

export interface ReduxErrorId {
    readonly id: string;
}
/**
 * Store errors for dispatched actions
 */
export interface ReduxErrorModel extends ReduxErrorId, T_Encoded_Base {
    readonly errorMessage?: string;
    readonly stack?: string;
    readonly type?: string;
}

//Hack
export const ReduxErrorIndex = '++id2, id';

/** @internal */
export function validateId({ id }: ReduxErrorId) {
    return { id };
}

/** @internal */
export function validate(item: ReduxErrorModel): ReduxErrorModel {
    return item as ReduxErrorModel;
}

export default ReduxErrorModel;
