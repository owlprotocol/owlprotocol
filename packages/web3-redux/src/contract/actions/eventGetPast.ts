import { createAction2 } from '@owlprotocol/crud-redux';
import { isUndefined, omitBy } from 'lodash-es';
import { name } from '../common.js';

/** @internal */
export const EVENT_GET_PAST = `${name}/EVENT_GET_PAST`;
/** @internal */
export interface EventGetPastActionInput {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
    fromBlock?: number | 'earliest';
    toBlock?: number | 'latest';
    blocks?: number;
    //Max events
    maxEvents?: number;
    //Concurrent requests
    maxConcurrentRequests?: number;
}
/** @category Actions */
export const eventGetPast = createAction2(EVENT_GET_PAST, (payload: EventGetPastActionInput) => {
    let fromBlock: number | undefined;
    if (payload.fromBlock == 'earliest') {
        fromBlock = 0;
    } else {
        fromBlock = payload.fromBlock;
    }

    let toBlock: number | 'latest';
    if (!payload.toBlock || payload.toBlock === 'latest') {
        toBlock = 'latest';
    } else {
        toBlock = payload.toBlock;
    }

    let maxEvents = payload.maxEvents ?? 100;
    let maxConcurrentRequests = payload.maxConcurrentRequests ?? 6;

    const result = { ...payload, fromBlock, toBlock, blocks: payload.blocks, maxEvents, maxConcurrentRequests }
    return omitBy(result, isUndefined) as typeof result
});
/** @internal */
export type EventGetPastAction = ReturnType<typeof eventGetPast>;
/** @internal */
export const isEventGetPastAction = eventGetPast.match;

export default eventGetPast;
