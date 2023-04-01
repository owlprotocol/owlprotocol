import { assert } from "chai";
import { ChildCRUD } from "./child/crud.js";
import { Child, ChildId } from "./child/model/interface.js";
import { createStore, StoreType } from "./store.js";
import { sleep } from "../utils/sleep.js";

describe(`store.test.js`, () => {
    describe("store", () => {
        let store: StoreType;
        const id0: ChildId = { firstName: "John", lastName: "Doe" };
        const item0: Child = { ...id0, age: 42 };

        beforeEach(async () => {
            store = createStore();
        });

        it.skip("create", async () => {
            store.dispatch(ChildCRUD.actions.create(item0));
            await sleep(1000);

            //Dexie
            const item0Dexie = await ChildCRUD.db.get(id0);
            assert.deepEqual(item0Dexie, item0);
        });

        it.skip("upsert", async () => {
            store.dispatch(ChildCRUD.actions.upsert(item0));
            await sleep(1000);

            //Dexie
            const item0Dexie = await ChildCRUD.db.get(id0);
            assert.deepEqual(item0Dexie, item0);
        });
    });
});
