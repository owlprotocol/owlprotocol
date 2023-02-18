import { v4 as uuidv4 } from 'uuid';
import { createAction2 } from '@owlprotocol/crud-redux';

import { name } from '../common.js';

export interface FetchTransactionOptions {
    startblock?: number;
    endblock?: number;
    page?: number;
    offset?: number;
    sort?: 'asc' | 'desc';
}

export interface FetchTransactionsPayload extends FetchTransactionOptions {
    networkId: string;
    address: string;
}

/** @internal */
export const FETCH_TRANSACTIONS = `${name}/FETCH_TRANSACTIONS`;
/** @category Actions */
export const fetchTransactions = createAction2(
    FETCH_TRANSACTIONS,
    (payload: FetchTransactionsPayload) => {
        return { ...payload, address: payload.address.toLowerCase() };
    },
);
/** @internal */
export type FetchTransactionsAction = ReturnType<typeof fetchTransactions>;
/** @internal */
export const isFetchTransactionsAction = fetchTransactions.match;
