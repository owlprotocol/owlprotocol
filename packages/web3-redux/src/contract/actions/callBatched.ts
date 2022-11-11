import { createAction2 } from '@owlprotocol/crud-redux';
import { name } from '../common.js';
import { CallActionInput, validateCallActionInput } from './call.js';

/** @internal */
export const CALL_BATCHED = `${name}/CALL_BATCHED`;
/** @internal */
export interface CallBatchedActionInput {
    calls: CallActionInput[]
}
/**
 * Optimally batched call requests.
 * Requests are grouped by network and batched with web3.BatchRequest().
 * @see {@link https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#batchrequest}
 *
 * Calls will be batched busing Multicall if:
 *  - network has a Multicall contract
 *  - from == undefined
 *  - defaultBlock == 'latest' || defaultBlock == undefined
 * @see {@link https://github.com/makerdao/multicall}
 * @category Actions
 */
export const callBatched = createAction2(CALL_BATCHED, (payload: CallBatchedActionInput) => {
    return { calls: payload.calls.map(validateCallActionInput) }
});

/** @internal */
export type CallBatchedAction = ReturnType<typeof callBatched>;
/** @internal */
export const isCallBatchedAction = callBatched.match;

export default callBatched;
