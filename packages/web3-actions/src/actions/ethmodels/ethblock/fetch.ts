import { createAction2 } from "@owlprotocol/crud-actions";
import { EthBlockName } from "@owlprotocol/web3-models";

/** @internal */
export const FETCH_BLOCK = `${EthBlockName}/FETCH`;
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
export type FetchBlockActionInput = FetchActionBlockNoInput | FetchActionBlockHashInput;
/** @category Actions */
export const fetchBlockAction = createAction2(FETCH_BLOCK, (payload: FetchBlockActionInput) => {
    const returnTransactionObjects = payload.returnTransactionObjects ?? false;
    return { ...payload, returnTransactionObjects };
});

/** @internal */
export type FetchBlockAction = ReturnType<typeof fetchBlockAction>;
