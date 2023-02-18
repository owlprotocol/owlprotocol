import type { Action } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { isUndefined, omitBy } from 'lodash-es';

import { name } from '../common.js';

/** @internal */
export interface EventSubscribeActionInput<T extends Record<string, any> = Record<string, any>> {
    networkId: string;
    address?: string;
    // Topics
    topic0?: string; //topic0 = keccak256(name + args)
    topic1?: string;
    topic2?: string;
    topic3?: string;
    //Event
    eventName?: string;
    filter?: Partial<T>;
}

export function validateEventSubscribeActionInput<T extends Record<string, any> = Record<string, any>>(payload: EventSubscribeActionInput<T>) {
    const result = {
        ...payload,
        address: payload.address?.toLowerCase(),
    }
    return omitBy(result, isUndefined) as typeof result
}

/** @internal */
export const EVENT_SUBSCRIBE = `${name}/SUBSCRIBE`;
export const EVENT_UNSUBSCRIBE = `${name}/UNSUBSCRIBE`;


/** @category Actions */
export function eventSubscribeAction<T extends Record<string, any> = Record<string, any>>(payload: EventSubscribeActionInput<T>, uuid?: string | undefined, ts?: number | undefined) {
    return {
        type: EVENT_SUBSCRIBE,
        payload: validateEventSubscribeActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now()
        },
    }
}
export function eventUnSubscribeAction<T extends Record<string, any> = Record<string, any>>(payload: EventSubscribeActionInput<T>, uuid?: string | undefined, ts?: number | undefined) {
    return {
        type: EVENT_SUBSCRIBE,
        payload: validateEventSubscribeActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now()
        },
    }
}

eventSubscribeAction.match = (action: Action) => action.type === EVENT_SUBSCRIBE
eventUnSubscribeAction.match = (action: Action) => action.type === EVENT_UNSUBSCRIBE

/** @internal */
export type EventSubscribeAction = ReturnType<typeof eventSubscribeAction>;
/** @internal */
export type EventUnSubscribeAction = ReturnType<typeof eventUnSubscribeAction>;


/** @internal */
export const isEventSubscribeAction = eventSubscribeAction.match;
/** @internal */
export const isEventUnSubscribeAction = eventUnSubscribeAction.match;
