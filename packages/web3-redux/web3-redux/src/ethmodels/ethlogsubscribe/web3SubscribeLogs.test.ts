import { assert } from "chai";
import Web3 from "web3";
import type { Contract as Web3Contract } from "web3-eth-contract";
import log from "loglevel"

import { utils } from "ethers";
import { sleep } from "@owlprotocol/utils";
import { isUndefined, omitBy } from "lodash-es";

import { EthLogSubscribeName, mapDeepBigNumberToString } from "@owlprotocol/web3-models";
import { web3SubscribeLogsAction, NetworkCRUDActions } from "@owlprotocol/web3-actions";
import { EthLogDexie } from "@owlprotocol/web3-dexie";
import { getTestWeb3Provider } from "@owlprotocol/web3-test-utils";

import { createStore, StoreType } from "../../store.js";
import {TypechainEthers} from "@owlprotocol/contracts";

const networkId = "1336";
describe(`${EthLogSubscribeName}/sagas/web3SubscribeLogs.test.ts`, () => {
    const eventFormatFull = "NewValue(uint256 indexed value)";
    const eventFragment = utils.EventFragment.from(eventFormatFull);
    const eventIface = new utils.Interface([eventFragment]);
    const topic0 = eventIface.getEventTopic(eventFragment);

    let web3: Web3; //Web3 loaded from store
    let accounts: string[];

    before(async () => {
        const provider = getTestWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    describe("store", () => {
        let web3Contract: Web3Contract;
        let address: string;
        let store: StoreType;

        beforeEach(async () => {
            web3Contract = await new web3.eth.Contract(TypechainEthers.BlockNumber__factory.abi as any)
                .deploy({
                    data: TypechainEthers.BlockNumber__factory.bytecode,
                })
                .send({
                    from: accounts[0],
                    gas: 1000000,
                    gasPrice: "875000000",
                });
            address = web3Contract.options.address.toLowerCase();

            store = createStore();
            store.dispatch(NetworkCRUDActions.actions.reduxUpsert({ networkId, web3 }));
        });

        it("web3SubscribeLogs - 1 result", async () => {
            const expectedEvents: any[] = [];
            web3.eth
                .subscribe("logs", {
                    address,
                    topics: [topic0, null],
                })
                .on("data", (e: any) => {
                    expectedEvents.push(
                        omitBy(
                            {
                                ...e,
                                networkId,
                                address,
                                eventFormatFull,
                                topic0: e.topics[0],
                                topic1: e.topics[1],
                                topic2: e.topics[2],
                                topic3: e.topics[3],
                                returnValues: mapDeepBigNumberToString(
                                    eventIface.decodeEventLog(eventFragment, e.data, e.topics),
                                ),
                            },
                            isUndefined,
                        ),
                    );
                });
            store.dispatch(
                web3SubscribeLogsAction({
                    networkId,
                    address,
                    topics: [],
                    eventFormatFull,
                }),
            );
            await sleep(1000);
            await web3Contract.methods.setValue(42).send({
                from: accounts[0],
                gas: 1000000,
                gasPrice: "875000000",
            });

            await sleep(2000);
            const events1 = await EthLogDexie.where({
                networkId,
                address,
                eventFormatFull,
            });
            const eventsAll = await EthLogDexie.all();
            log.debug(eventsAll);
            assert.deepEqual(events1, expectedEvents);
        });
    });
});
