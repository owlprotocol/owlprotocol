import { put, call, select } from "typed-redux-saga";
import { compact } from "lodash-es";
import {
    EthLogQueryCRUDActions,
    EthLogCRUDActions,
    Web3GetPastLogsRawAction,
    web3GetPastLogsRawAction,
} from "@owlprotocol/web3-actions";
import { EthLog, isWithEventFormat } from "@owlprotocol/web3-models";
import { EthLogDexie, EthLogQueryDexie } from "@owlprotocol/web3-dexie";
import { NetworkSelectors } from "@owlprotocol/web3-redux-orm";
import { splitBucket } from "./web3GetPastLogsBucket.js";

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

    const existingEventQuery = yield* call(EthLogQueryDexie.get, {
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
        const events = yield* call(EthLogDexie.bulkGet, existingEventQuery.events ?? []);
        return {
            events: compact(events),
        };
    }

    try {
        //Use Web3.eth.getPastLogs
        const network = yield* select(NetworkSelectors.selectByIdSingle, networkId);
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
        const updateQuery = EthLogQueryCRUDActions.actions.upsert(
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
            const batch = EthLogCRUDActions.actions.putBatched(events, meta.uuid, meta.ts);
            yield* put(batch);
        }

        //Return event logs
        return {
            events,
        };
    } catch (error) {
        const err = error as Error;
        //Update query cache
        const updateQuery = EthLogQueryCRUDActions.actions.upsert(
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
