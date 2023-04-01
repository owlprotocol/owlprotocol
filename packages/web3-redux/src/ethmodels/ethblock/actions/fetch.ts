import { createAction2 } from "@owlprotocol/crud-redux";
import { EthBlock } from "../common.js";

/** @internal */
export const FETCH = `${EthBlock}/FETCH`;
/** Block fetch action.  Uses web3.eth.getBlock(). */
export interface FetchActionBlockNoInput {
    networkId: string;
    /** block number */
    blockNumber: number;
    /**
     * If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
     * @defaultValue `true`
     */
    returnTransactionObjects?: boolean;
}
export interface FetchActionBlockHashInput {
    networkId: string;
    /** block hash */
    blockHash: string | "earliest" | "latest" | "pending";
    /**
     * If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
     * @defaultValue `true`
     */
    returnTransactionObjects?: boolean;
}
/** @internal */
export type FetchActionInput = FetchActionBlockNoInput | FetchActionBlockHashInput;
/** @category Actions */
export const fetchAction = createAction2(FETCH, (payload: FetchActionInput) => {
    const returnTransactionObjects = payload.returnTransactionObjects ?? false;
    return { ...payload, returnTransactionObjects };
});

/** @internal */
export type FetchAction = ReturnType<typeof fetchAction>;
/** @internal */
export const isFetchAction = fetchAction.match;
