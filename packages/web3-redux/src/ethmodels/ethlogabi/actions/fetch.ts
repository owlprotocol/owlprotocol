import { createAction2 } from "@owlprotocol/crud-redux";
import { EthLogAbiName } from "../common.js";

/** @internal */
export const FETCH = `${EthLogAbiName}/FETCH`;
/** Block fetch action.  Uses web3.eth.getBlock(). */
/** @internal */
export interface FetchActionInput {
    eventSighash: string;
}
/** @category Actions */
export const fetchAction = createAction2(FETCH, (payload: FetchActionInput) => {
    return { ...payload };
});

/** @internal */
export type FetchAction = ReturnType<typeof fetchAction>;
/** @internal */
export const isFetchAction = fetchAction.match;
