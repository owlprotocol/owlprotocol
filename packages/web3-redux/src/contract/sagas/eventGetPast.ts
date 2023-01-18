import { call, all } from 'typed-redux-saga';
import * as Contracts from '@owlprotocol/contracts';

import { ContractEvent } from '../../contractevent/model/interface.js';
import {
    EventGetPastAction,
    eventGetPastRawAction as eventGetPastRawAction,
} from '../actions/index.js';
import { eventGetPastRaw } from './eventGetPastRaw.js';
import { getBlockNumber } from '../../network/sagas/getBlockNumber.js';
import { getBlockNumberAction } from '../../network/actions/getBlockNumber.js';

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

    //Ranged queries
    let toBlockInitial: number;
    if (!toBlock || toBlock === 'latest') {
        const { latestBlockNumber } = yield* call(getBlockNumber, getBlockNumberAction({ networkId }, action.meta.uuid));
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

/**
 * Create version of eventGetPastSaga with typed event signature, and default event name.
 * @param eventName
 * @returns
 */
export function eventGetPastFactory<T extends Record<string, any> = Record<string, any>>(eventName: string) {
    return (action: EventGetPastAction): Generator<
        any,
        ContractEvent<T>[]
    > => {
        const payload = { ...action.payload, eventName }
        return eventGetPast({ type: action.type, payload, meta: { ...action.meta } }) as Generator<
            any,
            ContractEvent<T>[]
        >
    }
}

export const eventGetPastInterfaceImplementerSet = eventGetPastFactory<Contracts.Web3.InterfaceImplementerSetEvent['returnValues']>('InterfaceImplementerSet')
export const eventGetPastIERC20Transfer = eventGetPastFactory<Contracts.Web3.IERC20TransferEvent['returnValues']>('Transfer')
export const eventGetPastIERC721Transfer = eventGetPastFactory<Contracts.Web3.IERC721TransferEvent['returnValues']>('Transfer')
export const eventGetPastIERC1155TransferSingle = eventGetPastFactory<Contracts.Web3.IERC1155TransferSingleEvent['returnValues']>('TransferSingle')
export const eventGetPastIERC1155TransferBatch = eventGetPastFactory<Contracts.Web3.IERC1155TransferBatchEvent['returnValues']>('TransferBatch')
export const eventGetPastAssetRouterSupportsAsset = eventGetPastFactory<Contracts.Web3.SupportsAsset['returnValues']>('SupportsAsset')
export const eventGetPastAssetRouterRouteBasket = eventGetPastFactory<Contracts.Web3.RouteBasket['returnValues']>('RouteBasket')
