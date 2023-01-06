import { createAction2 } from '@owlprotocol/crud-redux';
import { name } from '../common.js';

/** @internal */
export const GET_BLOCK_NUMBER = `${name}/GET_BLOCK_NUMBER`;
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
        maxCacheAge: maxCacheAge ?? 0
    };
});

/** @internal */
export type GetBlockNumberAction = ReturnType<typeof getBlockNumberAction>;
/** @internal */
export const isGetBlockNumberAction = getBlockNumberAction.match;
