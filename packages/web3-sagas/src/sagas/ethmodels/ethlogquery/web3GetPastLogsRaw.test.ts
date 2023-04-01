import { testSaga } from "redux-saga-test-plan";
import { utils } from "ethers";
import { EthLogQueryCRUDActions, EthLogCRUDActions, web3GetPastLogsRawAction } from "@owlprotocol/web3-actions";
import { EthLogQueryName, ADDRESS_0 } from "@owlprotocol/web3-models";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";
import { EthLogQueryDexie } from "@owlprotocol/web3-dexie";

import { web3GetPastLogRawSaga } from "./web3GetPastLogsRaw.js";
import { getTestNetwork } from "../../../test/index.js";

const network1336 = getTestNetwork();
const networkId = network1336.networkId;
const web3 = network1336.web3!;

describe(`${EthLogQueryName}/web3GetPastLogsRaw.test.ts`, () => {
    const eventFormatFull = "NewValue(uint256 indexed value)";
    const eventFragment = utils.EventFragment.from(eventFormatFull);
    const eventIface = new utils.Interface([eventFragment]);
    const topic0 = eventIface.getEventTopic(eventFragment);

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

        const topic1 = action.payload.topics[1] ?? "*";
        const topic2 = action.payload.topics[2] ?? "*";
        const topic3 = action.payload.topics[3] ?? "*";
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
                .call(EthLogQueryDexie.get, {
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
                .select(NetworkSelectors.selectByIdSingle, networkId)
                .next({ web3 })
                .call([web3, web3.eth.getPastLogs], {
                    address,
                    topics: [topic0],
                    fromBlock,
                    toBlock,
                })
                .next(logs)
                .put(
                    EthLogQueryCRUDActions.actions.upsert(
                        {
                            networkId,
                            address,
                            eventFormatFull,
                            topics: [topic0],
                            fromBlock,
                            toBlock,
                            events: [{ networkId, blockNumber: 0, logIndex: 0 }],
                        },
                        action.meta.uuid,
                        action.meta.ts,
                    ),
                )
                .next()
                .put(EthLogCRUDActions.actions.putBatched(events, action.meta.uuid, action.meta.ts))
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
                .call(EthLogQueryDexie.get, {
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
                .select(NetworkSelectors.selectByIdSingle, networkId)
                .next({ web3 })
                .call([web3, web3.eth.getPastLogs], {
                    address,
                    topics: [topic0],
                    fromBlock: action.payload.fromBlock,
                    toBlock: action.payload.toBlock,
                })
                .throw(new Error("Returned error: query returned more than 10000 results"))
                .put(
                    EthLogQueryCRUDActions.actions.upsert(
                        {
                            networkId,
                            address,
                            eventFormatFull,
                            topics: [topic0],
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
});
