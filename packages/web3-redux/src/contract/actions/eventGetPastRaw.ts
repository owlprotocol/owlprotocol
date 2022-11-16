import { createAction2 } from '@owlprotocol/crud-redux';
import { isUndefined, omitBy } from 'lodash-es';

import { name } from '../common.js';

/** @internal */
export const EVENT_GET_PAST_RAW = `${name}/EVENT_GET_PAST_RAW`;
/** @internal */
export interface EventGetPastRawActionInput {
    id?: string;
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
    fromBlock: number;
    toBlock: number;
}
/** @category Actions */
export const eventGetPastRawAction = createAction2(
    EVENT_GET_PAST_RAW,
    (payload: EventGetPastRawActionInput) => {
        const { networkId, address, eventName, filter, fromBlock, toBlock } = payload;
        const addressChecksum = address.toLowerCase();

        //cache id for eventGetPast action
        const eventIndex = { networkId, address: addressChecksum, name: eventName, filter, fromBlock, toBlock };
        const id = JSON.stringify(eventIndex);
        const result = {
            id,
            networkId,
            address: addressChecksum,
            eventName,
            filter,
            fromBlock,
            toBlock,
        }
        return omitBy(result, isUndefined) as typeof result
    },
);
/** @internal */
export type EventGetPastRawAction = ReturnType<typeof eventGetPastRawAction>;
/** @internal */
export const isEventGetPastRawAction = eventGetPastRawAction.match;

export default eventGetPastRawAction;
