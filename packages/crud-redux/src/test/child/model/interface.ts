import { pick } from "lodash-es";
import { ChildCRUD } from "../crud.js";

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

//Hack
export const ChildIndex = "[firstName+lastName],lastName,age";
export type ChildIndexInput = ChildId | { firstName: string } | { lastName: string } | { age: number };

export type ChildIndexInputAnyOf =
    | { firstName: string[] | string; lastName: string[] | string }
    | { firstName: string[] | string }
    | { lastName: string[] | string }
    | { age: number[] | number };

/** @internal */
export function validateId({ firstName, lastName }: ChildId) {
    return { firstName, lastName };
}

export function toPrimaryKey({ firstName, lastName }: ChildId): [string, string] {
    return [firstName, lastName];
}

/** @internal */
export function validate(item: Child): Child {
    return pick(item, "firstName", "lastName", "age", "relatives");
}

export async function preWriteBulkDB(item: Child[]): Promise<Child[]> {
    //Get Relatives
    return Promise.all(
        item.map(async (c) => {
            const relatives = (await ChildCRUD.db.where({ lastName: c.lastName }))
                .filter((rel) => {
                    return c.firstName != rel.firstName;
                })
                .map((rel) => validateId(rel));
            return { ...c, relatives };
        }),
    );
}
export async function postWriteBulkDB(items: Child[]): Promise<any> {
    //Get Relatives
    const lastNames = items.map((c) => c.lastName);
    let people = await ChildCRUD.db.anyOf("lastName", lastNames);

    people = await Promise.all(
        people.map(async (c) => {
            const relatives = (await ChildCRUD.db.where({ lastName: c.lastName }))
                .filter((rel) => {
                    return c.firstName != rel.firstName;
                })
                .map((rel) => validateId(rel));
            return { ...c, relatives };
        }),
    );

    return ChildCRUD.db.bulkUpdateUnchained(people);
}
