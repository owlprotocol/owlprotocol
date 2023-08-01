import { pick } from "lodash-es";

export const ChildName = "Child";

export interface ChildId {
    readonly firstName: string;
    readonly lastName: string;
}
/**
 * Store errors for dispatched actions
 */
export interface Child extends ChildId {
    readonly age?: number;
    readonly relatives?: ChildId[];
}

export type ChildWithObjects = Child;

/** @internal */
export function validateIdChild({ firstName, lastName }: ChildId) {
    return { firstName, lastName };
}

export function toPrimaryKeyChild({ firstName, lastName }: ChildId): [string, string] {
    return [firstName, lastName];
}

/** @internal */
export function validateChild(item: Child): Child {
    return pick(item, "firstName", "lastName", "age", "relatives");
}

export const validateWithReduxChild = validateChild;
