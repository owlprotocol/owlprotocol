import { createAction2 } from "@owlprotocol/crud-redux";
import { Web3CallActionInput, validateWeb3CallActionInput } from "./web3Call.js";
import { EthCallName } from "../common.js";

/** @internal */
export const WEB3_CALL_BATCHED = `${EthCallName}/WEB3_CALL_BATCHED`;
/** @internal */
export interface Web3CallBatchedActionInput {
    readonly networkId: string;
    readonly multicall?: boolean;
    readonly calls: Omit<Web3CallActionInput, "networkId">[];
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
export const web3CallBatchedAction = createAction2(WEB3_CALL_BATCHED, (payload: Web3CallBatchedActionInput) => {
    return {
        networkId: payload.networkId,
        multicall: payload.multicall ?? false,
        calls: (payload.calls as Web3CallActionInput[]).map(validateWeb3CallActionInput),
    };
});

/** @internal */
export type Web3CallBatchedAction = ReturnType<typeof web3CallBatchedAction>;
/** @internal */
export const isWeb3CallBatchedAction = web3CallBatchedAction.match;
