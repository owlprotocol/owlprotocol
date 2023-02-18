import type { Action } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

/** @internal */
export const CALL = `${name}/CALL`;
/** @internal */
export interface CallActionInput<T extends any[] = any[]> {
    readonly networkId: string;
    readonly address: string;
    readonly method?: string;
    readonly args?: T;
    readonly ifnull?: boolean;
    readonly onSuccess?: (returnValue: any) => void;
    readonly onError?: (error: Error) => void;
    readonly maxCacheAge?: number
    /** `from` field of call. Some providers may default this to `null` or `ADDRESS_0`. */
    readonly from?: string;
    /** Historical block height to execute call. Defaults to `latest` */
    readonly defaultBlock?: number | 'latest';
    /** Maximum `gas` field for call. */
    readonly gas?: number;
}

export function validateCallActionInput<T extends any[] = any[]>(payload: CallActionInput<T>) {
    const { networkId, address, method, args, from, defaultBlock, gas, maxCacheAge, onSuccess, onError } = payload;
    return {
        networkId,
        address: address.toLowerCase(),
        method,
        args,
        from,
        defaultBlock,
        gas,
        maxCacheAge: maxCacheAge ?? 0,
        onSuccess, onError
    };
}
/**
 * Create contract call
 * @category Actions
 */
export function call<T extends any[] = any[]>(payload: CallActionInput<T>, uuid?: string | undefined, ts?: number | undefined) {
    return {
        type: CALL,
        payload: validateCallActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now()
        },
    }
}
call.match = (action: Action) => action.type === CALL

/** @internal */
export type CallAction<T extends any[] = any[]> = ReturnType<typeof call<T>>;
/** @internal */
export const isCallAction = call.match;

export default call;
