import { assert } from "chai";
import { ChildName } from "./child/common.js";
import { ChildCRUD } from "./child/crud.js";
import { Child, ChildId } from "./child/model/interface.js";
import { getDB } from "./db.js";

describe(`db.test.js`, () => {
    const id0: ChildId = { firstName: "John", lastName: "Doe" };
    const item0: Child = { ...id0, age: 42 };

    const id1: ChildId = { firstName: "Jane", lastName: "Doe" };
    const item1: Child = { ...id1, age: 69 };

    const id2: ChildId = { firstName: "Jack", lastName: "Doe" };
    const item2: Child = { ...id2, age: 420 };

    it("addUnchained", async () => {
        await ChildCRUD.db.addUnchained(item0);
        const result0 = await ChildCRUD.db.get(id0);
        assert.deepEqual(result0, item0);
    });

    it("add", async () => {
        await ChildCRUD.db.add(item0);
        const result0 = await ChildCRUD.db.get(id0);
        assert.deepEqual(result0, { ...item0, relatives: [] });
    });

    it("where", async () => {
        await ChildCRUD.db.addUnchained(item0);
        const result0 = await ChildCRUD.db.where({ firstName: "John" });
        assert.deepEqual(result0, [item0]);
    });

    it("bulkWhere", async () => {
        await ChildCRUD.db.addUnchained(item0);
        await ChildCRUD.db.addUnchained(item1);
        await ChildCRUD.db.addUnchained(item2);
        const result0 = await ChildCRUD.db.bulkWhere([{ firstName: "John" }, { lastName: "Doe" }]);
        assert.deepEqual(result0, [[item0], [item0, item1, item2]]);
    });

    it("bulkAddUnchained", async () => {
        await ChildCRUD.db.bulkAddUnchained([item0]);
        const result0 = await ChildCRUD.db.get(id0);
        assert.deepEqual(result0, item0);
    });

    it("bulkAddUnchained - error handling", async () => {
        try {
            await ChildCRUD.db.bulkAddUnchained([item0, item0]);
            // eslint-disable-next-line no-empty
        } catch (error) { }

        const result0 = await ChildCRUD.db.get(id0);
        assert.deepEqual(result0, item0);
    });

    it("bulkAdd", async () => {
        await ChildCRUD.db.bulkAdd([item0]);
        const result0 = await ChildCRUD.db.get(id0);
        assert.deepEqual(result0, { ...item0, relatives: [] });
    });

    it("bulkUpdateUnchained", async () => {
        await ChildCRUD.db.addUnchained(id0);
        const result0 = await ChildCRUD.db.get(id0);
        assert.deepEqual(result0, id0);

        await ChildCRUD.db.bulkUpdateUnchained([item0]);
        const result1 = await ChildCRUD.db.get(id0);
        assert.deepEqual(result1, item0);
    });

    it("bulkUpsertUnchained", async () => {
        await ChildCRUD.db.bulkUpsertUnchained([id0, item0]);
        const result0 = await ChildCRUD.db.get(id0);
        assert.deepEqual(result0, item0);
    });

    it("bulkUpsert", async () => {
        await ChildCRUD.db.bulkUpsert([item0]);
        const result0 = await ChildCRUD.db.get(id0);
        assert.deepEqual(result0, { ...item0, relatives: [] });
    });

    it("preWriteBulkDB, postWriteBulkDB", async () => {
        await ChildCRUD.db.add(item0);
        const result0 = await ChildCRUD.db.get(id0);
        assert.deepEqual(result0, { ...item0, relatives: [] });

        //Add John
        await ChildCRUD.db.bulkAdd([item1, item2]);
        //preWriteBulkDB
        const result1 = await ChildCRUD.db.get(id1);
        assert.deepEqual(result1, { ...item1, relatives: [id0, id2] }, "result1.relatives");

        //postWriteBulkDB
        const result2 = await ChildCRUD.db.get(id0);
        assert.deepEqual(result2, { ...item0, relatives: [id1, id2] }, "result2.relatives");
    });

    it("bulk vs single", async () => {
        const db = getDB();
        const items: ChildId[] = [];
        for (let i = 0; i < 1000; i++) {
            items.push({ firstName: `${i}`, lastName: `${i}` });
        }
        let t1 = Date.now();
        await db.table(ChildName).bulkAdd(items);
        t1 = Date.now() - t1;

        await db.table(ChildName).clear();

        let t2 = Date.now();
        await Promise.all(items.map((t) => db.table(ChildName).add(t)));
        t2 = Date.now() - t2;

        console.debug({ t1, t2, diff: t2 - t1 });
    });
});
