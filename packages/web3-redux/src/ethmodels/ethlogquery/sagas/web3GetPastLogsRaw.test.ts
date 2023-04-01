import { assert } from "chai";
import type { Contract as Web3Contract } from "web3-eth-contract";
import { testSaga } from "redux-saga-test-plan";

import * as Contracts from "@owlprotocol/contracts";
import { sleep } from "@owlprotocol/utils";
import { isUndefined, omitBy } from "lodash-es";
import { utils } from "ethers";
import { web3GetPastLogRawSaga } from "./web3GetPastLogsRaw.js";
import { AbiItem } from "../../../utils/web3-utils/index.js";

import { web3GetPastLogsRawAction } from "../actions/index.js";
import { network1336 } from "../../../network/data.js";
import { ADDRESS_0 } from "../../../data.js";
import { EthLogQueryCRUD } from "../crud.js";
import { createStore, StoreType } from "../../../store.js";
import { NetworkCRUD } from "../../../network/crud.js";
import { EthLogCRUD } from "../../ethlog/crud.js";
import { mapDeepBigNumberToString } from "../../../utils/mapDeepBigNumberToString.js";
import { EthLogQueryName } from "../common.js";

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

    describe("unit", () => {
        const address = ADDRESS_0;
        const blockNumber = 20;

        const action = web3GetPastLogsRawAction(
            {
                networkId,
                address,
                eventFormatFull,
                fromBlock: 0,
                toBlock: blockNumber,
            },
            "",
            0,
        );

        const topic1 = action.payload.topics[1];
        const topic2 = action.payload.topics[2];
        const topic3 = action.payload.topics[3];
        const fromBlock = action.payload.fromBlock;
        const toBlock = action.payload.toBlock;

        it("web3GetPastLogsRaw - 1 result", async () => {
            const logs = [
                {
                    address,
                    blockHash: "0x0",
                    blockNumber: 0,
                    logIndex: 0,
                    transactionIndex: 0,
                    data: "0x",
                    topics: [topic0, "0x000000000000000000000000000000000000000000000000000000000000002a"],
                },
            ];
            const events = logs.map((e) => {
                return { ...e, networkId, eventFormatFull };
            });
            testSaga(web3GetPastLogRawSaga, action)
                .next()
                .call(EthLogQueryCRUD.db.get, {
                    networkId,
                    address,
                    topic0,
                    topic1,
                    topic2,
                    topic3,
                    fromBlock,
                    toBlock,
                })
                .next(undefined)
                .select(NetworkCRUD.selectors.selectByIdSingle, networkId)
                .next({ web3 })
                .call([web3, web3.eth.getPastLogs], {
                    address,
                    topics: [topic0, null, null, null],
                    fromBlock,
                    toBlock,
                })
                .next(logs)
                .put(
                    EthLogQueryCRUD.actions.upsert(
                        {
                            networkId,
                            address,
                            eventFormatFull,
                            topics: [topic0, null, null, null],
                            fromBlock,
                            toBlock,
                            events: [{ networkId, blockNumber: 0, logIndex: 0 }],
                        },
                        action.meta.uuid,
                        action.meta.ts,
                    ),
                )
                .next()
                .put(EthLogCRUD.actions.putBatched(events, action.meta.uuid, action.meta.ts))
                .next()
                .returns({
                    events,
                })
                .next()
                .isDone();
        });

        it("web3GetPastLogsRaw - error too many", async () => {
            const action0 = web3GetPastLogsRawAction(
                {
                    networkId,
                    address,
                    eventFormatFull,
                    fromBlock: 10,
                    toBlock: 20,
                },
                "",
                0,
            );

            const action1 = web3GetPastLogsRawAction(
                {
                    networkId,
                    address,
                    eventFormatFull,
                    fromBlock: 0,
                    toBlock: 10,
                },
                "",
                0,
            );

            testSaga(web3GetPastLogRawSaga, action)
                .next()
                .call(EthLogQueryCRUD.db.get, {
                    networkId,
                    address,
                    topic0,
                    topic1,
                    topic2,
                    topic3,
                    fromBlock,
                    toBlock,
                })
                .next(undefined)
                .select(NetworkCRUD.selectors.selectByIdSingle, networkId)
                .next({ web3 })
                .call([web3, web3.eth.getPastLogs], {
                    address,
                    topics: [topic0, null, null, null],
                    fromBlock: action.payload.fromBlock,
                    toBlock: action.payload.toBlock,
                })
                .throw(new Error("Returned error: query returned more than 10000 results"))
                .put(
                    EthLogQueryCRUD.actions.upsert(
                        {
                            networkId,
                            address,
                            eventFormatFull,
                            topics: [topic0, null, null, null],
                            fromBlock,
                            toBlock,
                            errorId: action.meta.uuid,
                        },
                        action.meta.uuid,
                        action.meta.ts,
                    ),
                )
                .next()
                .returns({
                    actions: [action0, action1],
                })
                .next()
                .isDone();
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
            const events1 = await EthLogCRUD.db.where({
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

            const events1 = await EthLogCRUD.db.where({
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

            const events1 = await EthLogCRUD.db.where({
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

            const events1 = (await EthLogCRUD.db.where({ eventFormatFull })).sort(
                (a, b) => a.blockNumber - b.blockNumber,
            );
            assert.equal(events1.length, 1, "events1.length");
            assert.equal(expectedEvents.length, 1, "expectedEvents.length");
            assert.deepEqual(events1, expectedEvents);
        });
    });
});
