import { call, all } from "typed-redux-saga";
import { EthLog, isWithEventFormat } from "@owlprotocol/web3-models";
import { getBlockNumberAction } from "@owlprotocol/web3-actions";
import { Web3GetPastLogsAction } from "@owlprotocol/web3-actions";
import { web3GetPastLogsRawAction } from "@owlprotocol/web3-actions";
import { findBuckets } from "./web3GetPastLogsBucket.js";
import { web3GetPastLogRawSaga } from "./web3GetPastLogsRaw.js";
import { getBlockNumberSaga } from "../../network/getBlockNumber.js";

/** Batches event requests into EventGetPastRaw actions */
export function* eventGetPastSaga(action: Web3GetPastLogsAction): Generator<any, EthLog[]> {
    const { payload, meta } = action;
    const { networkId, address, topics, fromBlock, toBlock, blocks, maxEvents, maxConcurrentRequests } = payload;
    let eventFormatFull: string | undefined;
    if (isWithEventFormat(payload)) eventFormatFull = payload.eventFormatFull;

    //Ranged queries
    let toBlockInitial: number;
    if (!toBlock || toBlock === "latest") {
        const { latestBlockNumber } = yield* call(
            getBlockNumberSaga,
            getBlockNumberAction({ networkId }, meta.uuid, meta.ts),
        );
        toBlockInitial = latestBlockNumber;
    } else {
        toBlockInitial = toBlock;
    }

    let fromBlockInitial: number;
    if (fromBlock === undefined) {
        if (blocks) fromBlockInitial = Math.max(toBlockInitial - blocks, 0);
        else fromBlockInitial = 0;
    } else {
        fromBlockInitial = fromBlock;
    }

    const gen = findBuckets(fromBlockInitial, toBlockInitial);
    const tasks: ReturnType<typeof web3GetPastLogRawSaga>[] = [];
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
        const t = call(web3GetPastLogRawSaga, a);
        tasks.push(t);
    }

    const events: EthLog[] = [];
    while (tasks.length > 0) {
        const tasksBatch: ReturnType<typeof web3GetPastLogRawSaga>[] = [];
        //Create new batch
        for (let i = 0; i < Math.min(tasks.length, maxConcurrentRequests); i++) {
            const t = tasks.shift();
            tasksBatch.push(t!);
        }

        const results = yield* all(tasksBatch);
        for (const r of results) {
            if (r.events) {
                //Yield events, no recursive query needed
                events.push(...events);
                yield r.events;
            } else if (r.actions) {
                //No events, add to tasks array
                r.actions.forEach((a) => {
                    tasks.push(call(web3GetPastLogRawSaga, a));
                });
            }
        }
        if (events.length > maxEvents) break;
    }

    return events;
}
