import { assert } from "chai";
import type { Contract as Web3Contract } from "web3-eth-contract";
import { testSaga } from "redux-saga-test-plan";
import * as Contracts from "@owlprotocol/contracts";
import { isUndefined, omitBy } from "lodash-es";

import { sleep } from "@owlprotocol/utils";
import { utils } from "ethers";
import Web3 from "web3";
import { eventGetPastSaga } from "./web3GetPastLogs.js";
import { NetworkCRUD } from "../../../network/crud.js";
import { EthLogCRUD } from "../../ethlog/crud.js";

import { networkId } from "../../../test/data.js";

import { AbiItem } from "../../../utils/web3-utils/index.js";
import { EthLogQueryName } from "../common.js";
import { mineBlocks } from "../../../utils/index.js";
import { createStore, StoreType } from "../../../store.js";
import { ADDRESS_0 } from "../../../data.js";

import { web3GetPastLogsAction } from "../actions/index.js";
import { getBlockNumberSaga } from "../../../network/sagas/getBlockNumber.js";
import { getBlockNumberAction } from "../../../network/actions/getBlockNumber.js";
import { mapDeepBigNumberToString } from "../../../utils/mapDeepBigNumberToString.js";
import { getWeb3Provider } from "../../../test/getWeb3Provider.js";

describe(`${EthLogQueryName}/sagas/web3GetPastLogs.test.ts`, () => {
    const eventFormatFull = "NewValue(uint256 indexed value)";
    const eventFragment = utils.EventFragment.from(eventFormatFull);
    const eventIface = new utils.Interface([eventFragment]);
    const topic0 = eventIface.getEventTopic(eventFragment);

    let web3: Web3;
    let accounts: string[];
    before(async () => {
        const provider = getWeb3Provider();
        //@ts-ignore
        web3 = new Web3(provider);
        accounts = await web3.eth.getAccounts();
    });

    describe("unit", () => {
        const address = ADDRESS_0;
        it("eventGetPast - latestBlock", async () => {
            const action = web3GetPastLogsAction(
                {
                    networkId,
                    address,
                    eventFormatFull,
                    fromBlock: 0,
                },
                "",
                0,
            );

            /*
            const a = web3GetPastLogsRawAction(
                {
                    networkId,
                    address,
                    eventFormatFull,
                    filter: undefined,
                    fromBlock: 0,
                    toBlock: 5,
                },
                action.meta.uuid,
                action.meta.ts
            );
            //const expected = call(web3GetPastLogRawSaga, a);
            //console.debug(expected)
            */
            testSaga(eventGetPastSaga, action)
                .next()
                .call(getBlockNumberSaga, getBlockNumberAction({ networkId }, action.meta.uuid, action.meta.ts))
                .next({ latestBlockNumber: 5 });
            //.all(call(web3GetPastLogRawSaga, a));
        });
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
            store.dispatch(NetworkCRUD.actions.reduxUpsert({ networkId, web3 }));
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
            const events1 = await EthLogCRUD.db.where({
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

            const events1 = await EthLogCRUD.db.where({
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

            const events1 = (
                await EthLogCRUD.db.where({
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

            const events1 = (await EthLogCRUD.db.where({ eventFormatFull })).sort(
                (a, b) => a.blockNumber - b.blockNumber,
            );
            assert.equal(events1.length, 1, "events1.length");
            assert.equal(expectedEvents.length, 1, "expectedEvents.length");
            assert.deepEqual(events1, expectedEvents);
        });
    });
});
