import { ChildName, Child, validateChild, toPrimaryKeyChild } from "@owlprotocol/crud-models/test";
import { pick } from "lodash-es";
import { TestDexie } from "./db.js";
import { ChildKeyId, ChildKeyIdEq, ChildKeyIdx, ChildKeyIdxEq, ChildKeyIdxEqAny, ChildTable } from "./childTable.js";
import type { CRUDDexie } from "../table.js";
import { createCRUDDB } from "../createCRUDDB.js";

const ChildDexieNoPost = createCRUDDB<
    typeof ChildName,
    Child,
    ChildKeyId,
    ChildKeyIdEq,
    ChildKeyIdx,
    ChildKeyIdxEq,
    ChildKeyIdxEqAny
>(TestDexie, TestDexie[ChildName], {
    validateId: validateChild,
    toPrimaryKey: toPrimaryKeyChild,
    preWriteBulkDB: (items) => Promise.resolve(items),
    postWriteBulkDB: () => Promise.resolve(),
});
export async function preWriteBulkDB(items: Child[]): Promise<Child[]> {
    //Get Relatives
    const relativesAll = await ChildDexieNoPost.anyOf(
        "lastName",
        items.map((c) => c.lastName),
    );
    const result = items.map((c) => {
        const relatives = relativesAll
            .filter((r) => r.firstName != c.firstName)
            .map((x) => pick(x, "firstName", "lastName"));
        return {
            ...c,
            relatives,
        };
    });

    return result;
}
export async function postWriteBulkDB(items: Child[]): Promise<any> {
    //Get Relatives
    const relativesAll = await ChildDexieNoPost.anyOf(
        "lastName",
        items.map((c) => c.lastName),
    );

    const result = await Promise.all(
        relativesAll.map(async (c) => {
            const relatives = await (await ChildDexieNoPost.anyOf("lastName", [c.lastName]))
                .filter((r) => c.firstName != r.firstName)
                .map((c) => pick(c, "firstName", "lastName"));
            return {
                ...c,
                relatives,
            };
        }),
    );

    return ChildDexieNoPost.bulkUpdateUnchained(result);
}

export function getChildDexie(db: CRUDDexie<ChildTable> & { [ChildName]: ChildTable }) {
    return createCRUDDB<
        typeof ChildName,
        Child,
        ChildKeyId,
        ChildKeyIdEq,
        ChildKeyIdx,
        ChildKeyIdxEq,
        ChildKeyIdxEqAny
    >(db, db[ChildName], {
        validateId: validateChild,
        toPrimaryKey: toPrimaryKeyChild,
        preWriteBulkDB,
        postWriteBulkDB,
    });
}

export const ChildDexie = getChildDexie(TestDexie);
