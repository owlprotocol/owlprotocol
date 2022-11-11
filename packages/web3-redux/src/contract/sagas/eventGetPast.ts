import { put, call } from 'typed-redux-saga';
import {
    EventGetPastAction,
    EVENT_GET_PAST,
    eventGetPastRawAction as eventGetPastRawAction,
} from '../actions/index.js';
import ContractCRUD from '../crud.js';
import { fetchSaga } from './fetch.js';

const EVENT_GET_PAST_ERROR = `${EVENT_GET_PAST}/ERROR`;

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
export function* eventGetPast(action: EventGetPastAction) {
    try {
        const { payload } = action;
        const { networkId, address, eventName, filter, fromBlock, toBlock, blocks } = payload;

        const { network, contract } = yield* call(fetchSaga, ContractCRUD.actions.fetch({ networkId, address }));
        const web3 = network.web3!
        const web3Contract = contract.web3Contract!;

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
        for (const { from, to } of gen) {
            yield* put(
                eventGetPastRawAction(
                    {
                        networkId,
                        address,
                        eventName,
                        filter,
                        fromBlock: from,
                        toBlock: to,
                        web3Contract,
                    },
                    action.meta.uuid,
                ),
            );
        }
    } catch (error) {
        yield* put({
            id: action.meta.uuid,
            stack: (error as Error).stack,
            errorMessage: (error as Error).message,
            type: EVENT_GET_PAST_ERROR,
        });
    }
}

export default eventGetPast;
