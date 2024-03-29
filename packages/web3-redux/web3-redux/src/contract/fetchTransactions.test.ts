import { assert } from "chai";
import axios from "axios";
import moxios from "moxios";
import { sleep } from "@owlprotocol/utils";
import { fetchTransactions, NetworkCRUDActions } from "@owlprotocol/web3-actions";
import { EthTransactionDexie } from "@owlprotocol/web3-dexie";
import { createStore, StoreType } from "../store.js";

const networkId = "1336";
describe("contract/sagas/fetchTransactions.test.ts", () => {
    let store: StoreType;
    const address = "0xddBd2B932c763bA5b1b7AE3B362eac3e8d40121A".toLowerCase(); //Etherscan example
    const client = axios.create({ baseURL: "https://api.etherscan.io/api" });

    before(async () => {
        //Moxios install
        moxios.install(client);
    });

    after(() => {
        moxios.uninstall(client);
    });

    beforeEach(async () => {
        store = createStore();
        store.dispatch(
            NetworkCRUDActions.actions.reduxUpsert({
                networkId,
                explorerApiClient: client,
            }),
        );
    });

    it("fetchTransactions()", async () => {
        store.dispatch(fetchTransactions({ networkId, address }));

        await moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            assert.deepEqual(request.config.params, {
                module: "account",
                action: "txlist",
                address,
                startblock: 0,
                endblock: 99999999,
                page: 1,
                offset: 10,
                sort: "desc",
            });
            request.respondWith({
                status: 200,
                response: {
                    result: [
                        {
                            blockNumber: "1",
                            hash: "0xffff",
                        },
                    ],
                },
            });
        });

        await sleep(100);

        const transactions = await EthTransactionDexie.all();
        //https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YourApiKeyToken
        assert.equal(transactions.length, 1, "missing transactions fetched by Etherscan");
    });
});
