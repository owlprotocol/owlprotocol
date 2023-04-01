/* eslint-disable @typescript-eslint/no-unused-vars */
import { assert } from "chai";
import { omit } from "lodash-es";
import { ChildCRUD } from "./child/crud.js";
import { Child, ChildId } from "./child/model/interface.js";
import { createCRUDWorkers } from "../crud/createCRUDWorker.js";
import { sleep } from "../utils/sleep.js";

describe("createCRUDWorker.test.ts", () => {
    const id0: ChildId = { firstName: "John", lastName: "Doe" };
    const item0: Child = { ...id0, age: 42 };

    const id1: ChildId = { firstName: "Jane", lastName: "Doe" };
    const item1: Child = { ...id1, age: 69 };

    const id2: ChildId = { firstName: "Jack", lastName: "Doe" };
    const item2: Child = { ...id2, age: 420 };

    it.skip("create", async () => {
        const workers = createCRUDWorkers(2);
        workers[0].postMessage(ChildCRUD.actions.create(item0));
        await sleep(1000);
        workers[1].postMessage(ChildCRUD.actions.create(item1));
        await sleep(1000);

        /*
        //Dexie
        const item1Dexie = await ReduxErrorCRUD.db.get({ id: '1' });
        assert.deepEqual(omit(item1Dexie, 'updatedAt'), item1);
        */
    });
});
