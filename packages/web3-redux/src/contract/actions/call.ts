import { createAction2 } from '@owlprotocol/crud-redux';
import { name } from '../common.js';

/** @internal */
export const CALL = `${name}/CALL`;
/** @internal */
export interface CallActionInput {
    readonly networkId: string;
    readonly address: string;
    readonly method: string;
    readonly args?: any[];
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

export function validateCallActionInput(payload: CallActionInput) {
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
export const call = createAction2(CALL, (payload: CallActionInput) => {
    return validateCallActionInput(payload)
});
/** @internal */
export type CallAction = ReturnType<typeof call>;
/** @internal */
export const isCallAction = call.match;

export default call;
