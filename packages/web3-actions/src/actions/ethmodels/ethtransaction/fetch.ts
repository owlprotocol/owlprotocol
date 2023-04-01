import { createAction2 } from "@owlprotocol/crud-actions";
import { EthTransactionName } from "@owlprotocol/web3-models";

/** @internal */
export const TRANSACTION_FETCH = `${EthTransactionName}/FETCH`;
/** Block fetch action.  Uses web3.eth.getBlock(). */
export interface FetchTransactionActionInput {
    networkId: string;
    /** transaction */
    hash: string;
}
/** @category Actions */
export const fetchTransactionAction = createAction2(TRANSACTION_FETCH, (payload: FetchTransactionActionInput) => {
    return payload;
});

/** @internal */
export type FetchTransactionAction = ReturnType<typeof fetchTransactionAction>;
