import { assert } from "chai";
import axios from "axios";
import moxios from "moxios";
import * as Contracts from "@owlprotocol/contracts";
import { sleep } from "@owlprotocol/utils";
import { fetchAbi as fetchAbiAction, NetworkCRUDActions } from "@owlprotocol/web3-actions";
import { ContractDexie } from "@owlprotocol/web3-dexie";
import { createStore, StoreType } from "../store.js";

const WETH_ADDRESS = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2".toLowerCase();
const networkId = "1336";
describe("contract/sagas/fetchAbi.test.ts", () => {
    let store: StoreType;
    const address = WETH_ADDRESS; //WETH contract
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

    describe("fetchAbi", () => {
        it.skip("()", async () => {
            store.dispatch(
                fetchAbiAction({
                    networkId,
                    address,
                }),
            );

            await moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                assert.deepEqual(request.config.params, {
                    module: "contract",
                    action: "getabi",
                    address,
                });
                request.respondWith({
                    status: 200,
                    response: {
                        result: JSON.stringify(Contracts.Artifacts.IERC20.abi),
                    },
                });
            });

            await sleep(100);
            //Selector
            const contract = await ContractDexie.get({ networkId, address });
            assert.deepEqual(
                contract?.abi,
                Contracts.Artifacts.IERC20.abi as any,
                "contract.abi != Contracts.Artifacts.IERC20.abi",
            );
        });
    });
});
