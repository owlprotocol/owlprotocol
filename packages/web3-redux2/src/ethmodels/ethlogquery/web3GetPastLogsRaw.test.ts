import { assert } from "chai";
import type { Contract as Web3Contract } from "web3-eth-contract";

import * as Contracts from "@owlprotocol/contracts";
import { sleep } from "@owlprotocol/utils";
import { isUndefined, omitBy } from "lodash-es";
import { utils } from "ethers";
import type { AbiItem } from "web3-utils";

import { web3GetPastLogsRawAction } from "@owlprotocol/web3-actions";
import { NetworkCRUDActions } from "@owlprotocol/web3-actions";
import { EthLogQueryName, mapDeepBigNumberToString } from "@owlprotocol/web3-models";
import { getTestNetwork } from "@owlprotocol/web3-sagas";

import { EthLogDexie } from "@owlprotocol/web3-dexie";
import { createStore, StoreType } from "../../store.js";

const network1336 = getTestNetwork();
const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${EthLogQueryName}/sagas/web3GetPastLogsRaw.test.ts`, () => {
    const eventFormatFull = "NewValue(uint256 indexed value)";
    const eventFragment = utils.EventFragment.from(eventFormatFull);
    const eventIface = new utils.Interface([eventFragment]);
    const topic0 = eventIface.getEventTopic(eventFragment);

    let accounts: string[];

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    describe("store", () => {
        let web3Contract: Web3Contract;
        let address: string;
        let store: StoreType;

        beforeEach(async () => {
            web3Contract = await new web3.eth.Contract(Contracts.Artifacts.BlockNumber.abi as AbiItem[])
                .deploy({
                    data: Contracts.Artifacts.BlockNumber.bytecode,
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

        it("web3GetPastLogsRaw - no results", async () => {
            const fromBlock = await web3.eth.getBlockNumber();
            const toBlock = await web3.eth.getBlockNumber();
            store.dispatch(
                web3GetPastLogsRawAction({
                    networkId,
                    address,
                    eventFormatFull,
                    fromBlock,
                    toBlock,
                }),
            );

            await sleep(2000);

            //@ts-ignore
            const events1 = await EthLogDexie.where({
                networkId,
                address,
                eventFormatFull,
            });
            assert.deepEqual(events1, []);
        });

        it("web3GetPastLogsRaw - 1 result", async () => {
            const fromBlock = await web3.eth.getBlockNumber();
            await web3Contract.methods.setValue(42).send({
                from: accounts[0],
                gas: 1000000,
                gasPrice: "875000000",
            });
            const toBlock = await web3.eth.getBlockNumber();

            const action = web3GetPastLogsRawAction({
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
                    topics: [topic0, null],
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

        it("web3GetPastLogsRaw - no address", async () => {
            const fromBlock = await web3.eth.getBlockNumber();
            await web3Contract.methods.setValue(42).send({
                from: accounts[0],
                gas: 1000000,
                gasPrice: "875000000",
            });
            const toBlock = await web3.eth.getBlockNumber();

            const action = web3GetPastLogsRawAction({
                networkId,
                address: null,
                eventFormatFull,
                fromBlock,
                toBlock,
            });

            store.dispatch(action);

            await sleep(2000);

            const expectedEvents = (
                await web3.eth.getPastLogs({
                    address,
                    topics: [topic0, null],
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

        it("web3GetPastLogsRaw - filtered", async () => {
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
            const action = web3GetPastLogsRawAction({
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
