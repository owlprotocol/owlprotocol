import { assert } from "chai";
import { omit } from "lodash-es";
import { ChildCRUDActions } from "@owlprotocol/crud-actions/test";
import { ChildDexie } from "@owlprotocol/crud-dexie/test";
import { Child, ChildId } from "@owlprotocol/crud-models/test";
import { sleep } from "@owlprotocol/utils";
import { createTestStore, TestStoreType } from "./store.js";

describe(`store.test.js`, () => {
    describe("store", () => {
        let store: TestStoreType;
        const id0: ChildId = { firstName: "John", lastName: "Doe" };
        const item0: Child = { ...id0, age: 42 };

        beforeEach(async () => {
            store = createTestStore();
        });

        it("create", async () => {
            store.dispatch(ChildCRUDActions.actions.create(item0));
            await sleep(1000);

            //Dexie
            const item0Dexie = await ChildDexie.get(id0);
            assert.deepEqual(omit(item0Dexie, "relatives"), item0);
        });

        it("upsert", async () => {
            store.dispatch(ChildCRUDActions.actions.upsert(item0));
            await sleep(1000);

            //Dexie
            const item0Dexie = await ChildDexie.get(id0);
            assert.deepEqual(omit(item0Dexie, "relatives"), item0);
        });
    });
});
