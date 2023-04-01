import { NetworkName } from "@owlprotocol/web3-models";
import { createAction2 } from "@owlprotocol/crud-actions";
import type Web3 from "web3";
import { NetworkCRUDActions } from "../../crudactions/network.js";

/** @internal */
export const GET_CHAIN_ID = `${NetworkName}/GET_CHAIN_ID`;
/** @category Actions */
export const getChainIdAction = createAction2(GET_CHAIN_ID, (payload: Web3) => {
    return payload;
});

/** @internal */
export type GetChainIdAction = ReturnType<typeof getChainIdAction>;

/** @internal */
export const GET_BLOCK_NUMBER = `${NetworkName}/GET_BLOCK_NUMBER`;
/** @internal */
export interface GetBlockNumberActionInput {
    readonly networkId: string;
    readonly maxCacheAge?: number;
}

/** @category Actions */
export const getBlockNumberAction = createAction2(GET_BLOCK_NUMBER, (payload: GetBlockNumberActionInput) => {
    const { networkId, maxCacheAge } = payload;
    return {
        networkId,
        maxCacheAge: maxCacheAge,
    };
});

/** @internal */
export type GetBlockNumberAction = ReturnType<typeof getBlockNumberAction>;

export const NetworkActions = {
    ...NetworkCRUDActions,
    actions: {
        ...NetworkCRUDActions.actions,
        getChainId: getChainIdAction,
        getBlockNumber: getBlockNumberAction,
    },
};
