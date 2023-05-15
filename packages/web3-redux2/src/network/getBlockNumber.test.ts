import { assert } from "chai";
import { sleep } from "@owlprotocol/utils";
import { getBlockNumberAction, NetworkActions } from "@owlprotocol/web3-actions";
import { NetworkName } from "@owlprotocol/web3-models";
import { getTestNetwork } from "@owlprotocol/web3-sagas";
import log from "loglevel"

import { NetworkDexie } from "@owlprotocol/web3-dexie";
import { createStore, StoreType } from "../store.js";

const network1336 = getTestNetwork();
const networkId = network1336.networkId;
const web3 = network1336.web3;
const action = getBlockNumberAction({ networkId }, "");

describe(`${NetworkName}/getBlockNumber.test.ts`, () => {
    describe("store", () => {
        let store: StoreType;

        beforeEach(async () => {
            store = createStore();
            store.dispatch(NetworkActions.actions.reduxUpsert(network1336));
        });

        it("getBlockNumber", async () => {
            //Dispatch getBlockNumber, also validateWithReduxs store
            store.dispatch(action);
            await sleep(400);

            const selected0 = await NetworkDexie.get({ networkId });
            log.debug({ selected0 });
            assert.equal(selected0?.latestBlockNumber, await web3?.eth.getBlockNumber());
        });
    });
});
