import { createAction2 } from "@owlprotocol/crud-redux";
import { EthTransactionName } from "../common.js";

/** @internal */
export const FETCH = `${EthTransactionName}/FETCH`;
/** Block fetch action.  Uses web3.eth.getBlock(). */
export interface FetchActionInput {
    networkId: string;
    /** transaction */
    hash: string;
}
/** @category Actions */
export const fetchAction = createAction2(FETCH, (payload: FetchActionInput) => {
    return payload;
});

/** @internal */
export type FetchAction = ReturnType<typeof fetchAction>;
/** @internal */
export const isFetchAction = fetchAction.match;
