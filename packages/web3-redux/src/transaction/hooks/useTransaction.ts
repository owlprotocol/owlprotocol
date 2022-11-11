import { TransactionCRUD } from '../crud.js';

/**
 * Reads transaction from store and makes a call to fetch transaction.
 * @category Hooks
 * */
export const useTransaction = (
    networkId: string | undefined,
    hash: string | undefined,
    maxCacheAge = Number.MAX_SAFE_INTEGER,
) => {
    return TransactionCRUD.hooks.useFetch({ networkId, hash }, undefined, maxCacheAge)
};
