import { assert } from "chai";
import type { Contract as Web3Contract } from "web3-eth-contract";
import { isUndefined, omitBy } from "lodash-es";
import { sleep } from "@owlprotocol/utils";
import { utils } from "ethers";
import Web3 from "web3";

import { NetworkCRUDActions, web3GetPastLogsAction } from "@owlprotocol/web3-actions";
import { EthLogQueryName, mapDeepBigNumberToString } from "@owlprotocol/web3-models";
import { EthLogDexie } from "@owlprotocol/web3-dexie";
import { getTestWeb3Provider } from "@owlprotocol/web3-test-utils";

import { mineBlocks } from "../../utils/index.js";
import { createStore, StoreType } from "../../store.js";
import {TypechainEthers} from "@owlprotocol/contracts";

const networkId = "1336";
describe(`${EthLogQueryName}/sagas/web3GetPastLogs.test.ts`, () => {
    const eventFormatFull = "NewValue(uint256 indexed value)";
    const eventFragment = utils.EventFragment.from(eventFormatFull);
    const eventIface = new utils.Interface([eventFragment]);
    const topic0 = eventIface.getEventTopic(eventFragment);

    let web3: Web3;
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

        it("eventGetPast - no results", async () => {
            store.dispatch(
                web3GetPastLogsAction({
                    networkId,
                    address,
                    eventFormatFull,
                }),
            );
            await sleep(2000);
            const events1 = await EthLogDexie.where({
                networkId,
                address,
                eventFormatFull,
            });
            assert.deepEqual(events1, []);
        });

        it("web3GetPastLogs - 1 result", async () => {
            const fromBlock = await web3.eth.getBlockNumber();
            await web3Contract.methods.setValue(42).send({
                from: accounts[0],
                gas: 1000000,
                gasPrice: "875000000",
            });
            const toBlock = await web3.eth.getBlockNumber();

            const action = web3GetPastLogsAction({
                networkId,
                address,
                eventFormatFull,
                fromBlock,
                toBlock,
            });
            store.dispatch(action);

            await sleep(2000);

            const expectedEvents = (
                await web3.eth.getPastLogs({
                    address,
                    topics: [topic0],
                    fromBlock,
                    toBlock,
                })
            ).map((e) => {
                return omitBy(
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
                ) as any;
            });

            const events1 = await EthLogDexie.where({
                networkId,
                address,
                eventFormatFull,
            });
            assert.deepEqual(events1, expectedEvents);
        });

        it("web3GetPastLogs - 100 result", async () => {
            await mineBlocks(web3, 5);
            const fromBlock = await web3.eth.getBlockNumber();
            const eventsCount = 100;
            for (let i = 0; i < eventsCount; i++) {
                await web3Contract.methods.setValue(i).send({
                    from: accounts[0],
                    gas: 1000000,
                    gasPrice: "875000000",
                });
            }
            const toBlock = await web3.eth.getBlockNumber();

            const action = web3GetPastLogsAction({
                networkId,
                address,
                eventFormatFull,
                fromBlock,
                toBlock,
            });

            store.dispatch(action);

            await sleep(5000);

            const expectedEvents = (
                await web3.eth.getPastLogs({
                    address,
                    topics: [topic0],
                    fromBlock,
                    toBlock,
                })
            ).map((e) => {
                return omitBy(
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
                ) as any;
            });

            const events1 = (
                await EthLogDexie.where({
                    networkId,
                    address,
                    eventFormatFull,
                })
            ).sort((a, b) => a.blockNumber - b.blockNumber);
            assert.equal(events1.length, eventsCount, "events1.length");
            assert.equal(expectedEvents.length, eventsCount, "expectedEvents.length");
            assert.deepEqual(events1, expectedEvents);
        });

        it("web3GetPastLogs - filtered", async () => {
            const fromBlock = await web3.eth.getBlockNumber();
            const eventsCount = 10;
            for (let i = 0; i < eventsCount; i++) {
                await web3Contract.methods.setValue(i).send({
                    from: accounts[0],
                    gas: 1000000,
                    gasPrice: "875000000",
                });
            }
            const toBlock = await web3.eth.getBlockNumber();
            const action = web3GetPastLogsAction({
                networkId,
                address,
                eventFormatFull,
                fromBlock,
                toBlock,
                filter: { value: 5 },
            });
            const topic1 = action.payload.topics[1];

            store.dispatch(action);

            await sleep(2000);

            const expectedEvents = (
                await web3.eth.getPastLogs({
                    address,
                    topics: [topic0, topic1],
                    fromBlock,
                    toBlock,
                })
            ).map((e) => {
                return omitBy(
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
                ) as any;
            });

            const events1 = (await EthLogDexie.where({ eventFormatFull })).sort(
                (a, b) => a.blockNumber - b.blockNumber,
            );
            assert.equal(events1.length, 1, "events1.length");
            assert.equal(expectedEvents.length, 1, "expectedEvents.length");
            assert.deepEqual(events1, expectedEvents);
        });
    });
});
