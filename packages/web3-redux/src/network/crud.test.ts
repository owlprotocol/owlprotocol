import { assert } from "chai";

import { sleep } from "@owlprotocol/utils";
import { omit } from "lodash-es";
import { network1336 } from "./data.js";
import { NetworkCRUD } from "./crud.js";
import { createStore, StoreType } from "../store.js";

describe("pet/crud.test.js", () => {
    describe("store", () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
        });

        it("create", async () => {
            store.dispatch(NetworkCRUD.actions.create(network1336));
            await sleep(1000);

            //Redux ORM
            const network1337Redux = NetworkCRUD.selectors.selectByIdSingle(store.getState(), network1336.networkId);
            assert.isDefined(network1337Redux, "selectByIdSingle() undefined");
            assert.isDefined(network1337Redux?.web3, "web3 undefined");
            assert.deepEqual(NetworkCRUD.encode(network1337Redux!), NetworkCRUD.encode(network1336));

            //Dexie
            const network1337Dexie = await NetworkCRUD.db.get(network1336.networkId);
            assert.isDefined(network1337Dexie, "db.get() undefined");
            assert.deepEqual(omit(network1337Dexie, "updatedAt"), NetworkCRUD.encode(network1336));
        });
    });
});
