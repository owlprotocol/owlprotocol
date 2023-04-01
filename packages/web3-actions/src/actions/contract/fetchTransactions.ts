import { createAction2 } from "@owlprotocol/crud-actions";

import { ContractName } from "@owlprotocol/web3-models";

export interface FetchTransactionOptions {
    startblock?: number;
    endblock?: number;
    page?: number;
    offset?: number;
    sort?: "asc" | "desc";
}

export interface FetchTransactionsPayload extends FetchTransactionOptions {
    networkId: string;
    address: string;
}

/** @internal */
export const FETCH_TRANSACTIONS = `${ContractName}/FETCH_TRANSACTIONS`;
/** @category Actions */
export const fetchTransactions = createAction2(FETCH_TRANSACTIONS, (payload: FetchTransactionsPayload) => {
    return { ...payload, address: payload.address.toLowerCase() };
});
/** @internal */
export type FetchTransactionsAction = ReturnType<typeof fetchTransactions>;
/** @internal */
export const isFetchTransactionsAction = fetchTransactions.match;
