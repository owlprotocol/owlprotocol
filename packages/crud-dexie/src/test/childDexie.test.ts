import { Child, ChildId } from "@owlprotocol/crud-models/test";
import { assert } from "chai";
import { getChildDexie, preWriteBulkDB } from "./childDexie.js";
import { createTestDexie } from "./db.js";

describe(`db.test.js`, () => {
    const ChildDexie = getChildDexie(createTestDexie());
    const id0: ChildId = { firstName: "John", lastName: "Doe" };
    const item0: Child = { ...id0, age: 42 };

    const id1: ChildId = { firstName: "Jane", lastName: "Doe" };
    const item1: Child = { ...id1, age: 69 };

    const id2: ChildId = { firstName: "Jack", lastName: "Doe" };
    const item2: Child = { ...id2, age: 420 };

    beforeEach(async () => {
        assert.deepEqual(await ChildDexie.all(), [], "empty start");
    });

    it("addUnchained", async () => {
        await ChildDexie.addUnchained(item0);
        const result0 = await ChildDexie.get(id0);
        assert.deepEqual(result0, item0);
    });

    it("add", async () => {
        await ChildDexie.add(item0);
        const result0 = await ChildDexie.get(id0);
        assert.deepEqual(result0, { ...item0, relatives: [] });
    });

    it("where", async () => {
        await ChildDexie.addUnchained(item0);
        const result0 = await ChildDexie.where({ firstName: "John" });
        assert.deepEqual(result0, [item0]);
    });

    it("bulkWhere", async () => {
        await ChildDexie.addUnchained(item0);
        await ChildDexie.addUnchained(item1);
        await ChildDexie.addUnchained(item2);
        const result0 = await ChildDexie.bulkWhere([{ firstName: "John" }, { lastName: "Doe" }]);
        assert.deepEqual(result0, [[item0], [item0, item1, item2]]);
    });

    it("bulkAddUnchained", async () => {
        await ChildDexie.bulkAddUnchained([item0]);
        const result0 = await ChildDexie.get(id0);
        assert.deepEqual(result0, item0);
    });

    it("bulkAddUnchained - error handling", async () => {
        try {
            await ChildDexie.bulkAddUnchained([item0, item0]);
            // eslint-disable-next-line no-empty
        } catch (error) { }

        const result0 = await ChildDexie.get(id0);
        assert.deepEqual(result0, item0);
    });

    it("bulkAdd", async () => {
        await ChildDexie.bulkAdd([item0]);
        const result0 = await ChildDexie.get(id0);
        assert.deepEqual(result0, { ...item0, relatives: [] });
    });

    it("bulkUpdateUnchained", async () => {
        await ChildDexie.addUnchained(id0);
        const result0 = await ChildDexie.get(id0);
        assert.deepEqual(result0, id0);

        await ChildDexie.bulkUpdateUnchained([item0]);
        const result1 = await ChildDexie.get(id0);
        assert.deepEqual(result1, item0);
    });

    it("bulkUpsertUnchained", async () => {
        await ChildDexie.bulkUpsertUnchained([id0, item0]);
        const result0 = await ChildDexie.get(id0);
        assert.deepEqual(result0, item0);
    });

    it("bulkUpsert", async () => {
        await ChildDexie.bulkUpsert([item0]);
        const result0 = await ChildDexie.get(id0);
        assert.deepEqual(result0, { ...item0, relatives: [] });
    });

    it("preWriteBulkDB, postWriteBulkDB", async () => {
        await ChildDexie.add(item0);
        const result0 = await ChildDexie.get(id0);
        assert.deepEqual(result0, { ...item0, relatives: [] });

        //preWriteBulkDb
        assert.deepEqual(await preWriteBulkDB([item1]), [{ ...item1, relatives: [id0] }], "preWriteBulkDB");

        //postWriteBulkdDb
        //Add Jane, Jack
        await ChildDexie.bulkAdd([item1, item2]);

        //only id0 set as relative due to concurrent insert
        const result1 = await ChildDexie.get(id1);
        assert.deepEqual(result1, { ...item1, relatives: [id2, id0] }, "result1.relatives");
        //id1, id2 set as relatives
        const result2 = await ChildDexie.get(id0);
        assert.deepEqual(result2, { ...item0, relatives: [id2, id1] }, "result2.relatives");
    });
});
