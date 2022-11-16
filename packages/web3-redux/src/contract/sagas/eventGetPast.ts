import { call, all } from 'typed-redux-saga';
import { ContractEvent } from '../../contractevent/model/interface.js';
import {
    EventGetPastAction,
    eventGetPastRawAction as eventGetPastRawAction,
} from '../actions/index.js';
import { ContractWithObjects } from '../model/interface.js';
import { eventGetPastRaw } from './eventGetPastRaw.js';
import { fetchSaga as fetchNetworkSaga } from '../../network/sagas/fetch.js';
import { NetworkCRUD } from '../../network/crud.js';

const sizes = [10000000, 5000000, 1000000, 500000, 100000, 50000, 10000, 5000, 1000, 500, 100, 50, 10];
const minSize = sizes[sizes.length - 1];
//Returns buckets from small to large starting from 0-to
export function* findBuckets(from: number, to: number) {
    const fromMod = from % minSize === 0 ? from : from - (from % minSize) + minSize;
    let toMod = to - (to % minSize); //smallest bucket
    if (toMod != to) {
        //Initial bucket remainder
        yield { from: toMod, to };
    }

    while (toMod > fromMod) {
        for (const size of sizes) {
            if (toMod % size == 0 && toMod - size >= fromMod) {
                //valid bucket
                yield { from: toMod - size, to: toMod };
                toMod = toMod - size;
                break;
            }
        }
    }

    if (fromMod != from) {
        //Last bucket remainder
        yield { from, to: fromMod };
    }
}

export function* splitBucket(from: number, to: number) {
    const fromMod = from - (from % minSize);
    let toMod = to - (to % minSize); //smallest bucket
    const range = toMod - fromMod;
    const size = sizes.find((x) => x < range); //find next range
    if (size) {
        while (toMod > fromMod) {
            yield { from: toMod - size, to: toMod };
            toMod = toMod - size;
        }
    }
}

/** Batches event requests into EventGetPastRaw actions */
export function* eventGetPast(action: EventGetPastAction): Generator<
    any,
    ContractEvent[]
> {
    const { payload } = action;
    const { networkId, address, eventName, filter, fromBlock, toBlock, blocks, maxEvents, maxConcurrentRequests } = payload;

    const { network } = yield* call(fetchNetworkSaga, NetworkCRUD.actions.fetch({ networkId }, action.meta.uuid, action.meta.ts));
    const web3 = network.web3!

    //Ranged queries
    let toBlockInitial: number;
    if (!toBlock || toBlock === 'latest') {
        toBlockInitial = yield* call(web3.eth.getBlockNumber);
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
    let tasks: ReturnType<typeof eventGetPastRaw>[] = []
    for (const { from, to } of gen) {
        const a = eventGetPastRawAction(
            {
                networkId,
                address,
                eventName,
                filter,
                fromBlock: from,
                toBlock: to,
            },
            action.meta.uuid,
            action.meta.ts
        )
        const t = call(eventGetPastRaw, a);
        tasks.push(t);
    }

    const events: ContractEvent[] = []
    while (tasks.length > 0) {
        let tasksBatch: ReturnType<typeof eventGetPastRaw>[] = []
        //Create new batch
        for (let i = 0; i < Math.min(tasks.length, maxConcurrentRequests); i++) {
            const t = tasks.shift()
            tasksBatch.push(t!)
        }

        const results = yield* all(tasksBatch);
        for (const r of results) {
            if (r.events) {
                //Yield events, no recursive query needed
                events.push(...events)
                yield r.events;
            } else if (r.actions) {
                //No events, add to tasks array
                r.actions.forEach((a) => {
                    tasks.push(call(eventGetPastRaw, a));
                });
            }
        }
        if (events.length > maxEvents) break;
    }

    return events
}
