import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@owlprotocol/crud-redux';

import { name } from '../common.js';
import { BaseWeb3Contract } from '../model/interface.js';

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
    //Avoid loading contract, simply pass web3Contract
    web3Contract?: BaseWeb3Contract;
}
/** @category Actions */
export const eventGetPastRawAction = createAction(
    EVENT_GET_PAST_RAW,
    (payload: EventGetPastRawActionInput, uuid?: string) => {
        const { networkId, address, eventName, filter, fromBlock, toBlock, web3Contract } = payload;
        const addressChecksum = address.toLowerCase();

        //cache id for eventGetPast action
        const eventIndex = { networkId, address: addressChecksum, name: eventName, filter, fromBlock, toBlock };
        const id = JSON.stringify(eventIndex);
        return {
            payload: {
                id,
                networkId,
                address: addressChecksum,
                eventName,
                filter,
                fromBlock,
                toBlock,
                web3Contract,
            },
            meta: {
                uuid: uuid ?? uuidv4(),
            },
        };
    },
);
/** @internal */
export type EventGetPastRawAction = ReturnType<typeof eventGetPastRawAction>;
/** @internal */
export const isEventGetPastRawAction = eventGetPastRawAction.match;

export default eventGetPastRawAction;
