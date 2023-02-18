import type { Action } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { isUndefined, omitBy } from 'lodash-es';
import { name } from '../../contract/common.js';

/** @internal */
export const EVENT_GET_PAST = `${name}/EVENT_GET_PAST`;
/** @internal */
export interface EventGetPastActionInput<T extends Record<string, any> = Record<string, any>> {
    networkId: string;
    address?: string;
    //Topics
    topic0?: string; //topic0 = keccak256(name + args)
    topic1?: string;
    topic2?: string;
    topic3?: string;
    //Block range
    fromBlock?: number | 'earliest';
    toBlock?: number | 'latest';
    blocks?: number;
    //Event
    eventName?: string;
    filter?: Partial<T>;
    //Max events
    maxEvents?: number;
    //Concurrent requests
    maxConcurrentRequests?: number;
}

export function validateEventGetPastActionInput<T extends Record<string, any> = Record<string, any>>(payload: EventGetPastActionInput<T>) {
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

    const result = {
        ...payload,
        address: payload.address?.toLowerCase(),
        fromBlock, toBlock, blocks: payload.blocks,
        maxEvents, maxConcurrentRequests
    }
    return omitBy(result, isUndefined) as typeof result
}

/** @category Actions */
export function eventGetPastAction<T extends Record<string, any> = Record<string, any>>(payload: EventGetPastActionInput<T>, uuid?: string | undefined, ts?: number | undefined) {
    return {
        type: EVENT_GET_PAST,
        payload: validateEventGetPastActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now()
        },
    }
}
eventGetPastAction.match = (action: Action) => action.type === EVENT_GET_PAST

/** @internal */
export type EventGetPastAction = ReturnType<typeof eventGetPastAction>;
/** @internal */
export const isEventGetPastAction = eventGetPastAction.match;
