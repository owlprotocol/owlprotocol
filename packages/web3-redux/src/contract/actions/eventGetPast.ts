import { v4 as uuidv4 } from 'uuid';
import { createAction } from '@owlprotocol/crud-redux';
import { name } from '../common.js';
import { BaseWeb3Contract } from '../model/interface.js';

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
    web3Contract?: BaseWeb3Contract;
}
/** @category Actions */
export const eventGetPast = createAction(EVENT_GET_PAST, (payload: EventGetPastActionInput, uuid?: string) => {
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

    return {
        payload: { ...payload, fromBlock, toBlock, blocks: payload.blocks },
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type EventGetPastAction = ReturnType<typeof eventGetPast>;
/** @internal */
export const isEventGetPastAction = eventGetPast.match;

export default eventGetPast;
