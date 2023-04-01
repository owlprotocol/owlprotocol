import { put, call, select } from "typed-redux-saga";
import { compact } from "lodash-es";
import { splitBucket } from "./web3GetPastLogsBucket.js";
import { EthLogCRUD } from "../../ethlog/crud.js";
import { EthLogQueryCRUD } from "../crud.js";
import { EthLog, isWithEventFormat } from "../../ethlog/model/interface.js";
import { NetworkCRUD } from "../../../network/crud.js";
import { Web3GetPastLogsRawAction, web3GetPastLogsRawAction } from "../actions/web3GetPastLogsRaw.js";

export function* web3GetPastLogRawSaga(action: Web3GetPastLogsRawAction): Generator<
    any,
    {
        events?: EthLog[];
        actions?: Web3GetPastLogsRawAction[];
    }
> {
    const { payload, meta } = action;
    const { networkId, address, topics, fromBlock, toBlock } = payload;
    let eventFormatFull: string | undefined;
    if (isWithEventFormat(payload)) eventFormatFull = payload.eventFormatFull;

    const existingEventQuery = yield* call(EthLogQueryCRUD.db.get, {
        networkId,
        address: address ?? "*",
        topic0: topics[0] ?? "*",
        topic1: topics[1] ?? "*",
        topic2: topics[2] ?? "*",
        topic3: topics[3] ?? "*",
        fromBlock,
        toBlock,
    });
    if (existingEventQuery) {
        //Cached data
        const events = yield* call(EthLogCRUD.db.bulkGet, existingEventQuery.events ?? []);
        return {
            events: compact(events),
        };
    }

    try {
        //Use Web3.eth.getPastLogs
        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
        if (!network) throw new Error(`Network ${networkId} undefined`);
        const web3 = network.web3;
        if (!web3) throw new Error(`Network ${networkId} missing web3`);

        //Strip topics to last null
        const options: any = {
            address,
            topics,
            fromBlock,
            toBlock,
        };
        const logsData = yield* call([web3, web3.eth.getPastLogs], options);

        const eventIds = logsData.map((e) => {
            return {
                networkId,
                blockNumber: e.blockNumber,
                logIndex: e.logIndex,
            };
        });
        const updateQuery = EthLogQueryCRUD.actions.upsert(
            {
                networkId,
                address,
                eventFormatFull,
                topics,
                fromBlock,
                toBlock,
                events: eventIds,
            },
            meta.uuid,
            meta.ts,
        );
        yield* put(updateQuery);

        const events = logsData.map((e) => {
            return { ...e, networkId, eventFormatFull };
        });
        if (logsData.length > 0) {
            const batch = EthLogCRUD.actions.putBatched(events, meta.uuid, meta.ts);
            yield* put(batch);
        }

        //Return event logs
        return {
            events,
        };
    } catch (error) {
        const err = error as Error;
        //Update query cache
        const updateQuery = EthLogQueryCRUD.actions.upsert(
            {
                networkId,
                address,
                eventFormatFull,
                topics,
                fromBlock,
                toBlock,
                errorId: action.meta.uuid,
            },
            meta.uuid,
            meta.ts,
        );
        yield* put(updateQuery);

        //Returned error: query returned more than 10000 results
        if (err.message === "Returned error: query returned more than 10000 results") {
            //Dispatch split block query
            const gen = splitBucket(fromBlock, toBlock);
            const actions: Web3GetPastLogsRawAction[] = [];
            for (const { from, to } of gen) {
                const a = web3GetPastLogsRawAction(
                    {
                        networkId,
                        address,
                        eventFormatFull,
                        topics,
                        fromBlock: from,
                        toBlock: to,
                    },
                    meta.uuid,
                    meta.ts,
                );
                actions.push(a);
            }

            return {
                actions,
            };
        }
        throw err;
    }
}
