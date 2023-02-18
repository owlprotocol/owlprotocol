import type { Action } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { isUndefined, omitBy } from 'lodash-es';

import { name } from '../common.js';

/** @internal */
export const EVENT_GET_PAST_RAW = `${name}/EVENT_GET_PAST_RAW`;
/** @internal */
export interface EventGetPastRawActionInput<T extends Record<string, any> = Record<string, any>> {
    networkId: string;
    address?: string;
    // Topics
    topic0?: string; //topic0 = keccak256(name + args)
    topic1?: string;
    topic2?: string;
    topic3?: string;
    //Block range
    fromBlock: number;
    toBlock: number;
    //Event
    eventName?: string;
    filter?: Partial<T>;
}

export function validateEventGetPastRawActionInput<T extends Record<string, any> = Record<string, any>>(payload: EventGetPastRawActionInput<T>) {
    const result = {
        ...payload,
        address: payload.address?.toLowerCase(),
    }
    return omitBy(result, isUndefined) as typeof result
}
/** @category Actions */
export function eventGetPastRawAction<T extends Record<string, any> = Record<string, any>>(payload: EventGetPastRawActionInput<T>, uuid?: string | undefined, ts?: number | undefined) {
    return {
        type: EVENT_GET_PAST_RAW,
        payload: validateEventGetPastRawActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now()
        },
    }
}
eventGetPastRawAction.match = (action: Action) => action.type === EVENT_GET_PAST_RAW

/** @internal */
export type EventGetPastRawAction = ReturnType<typeof eventGetPastRawAction>;
/** @internal */
export const isEventGetPastRawAction = eventGetPastRawAction.match;
