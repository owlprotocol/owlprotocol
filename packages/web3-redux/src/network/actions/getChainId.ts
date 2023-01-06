import Web3 from 'web3';
import { createAction2 } from '@owlprotocol/crud-redux';

import { name } from '../common.js';

/** @internal */
export const GET_CHAIN_ID = `${name}/GET_CHAIN_ID`;
/** @category Actions */
export const getChainId = createAction2(GET_CHAIN_ID, (payload: Web3) => {
    return payload;
});

/** @internal */
export type GetChainIdAction = ReturnType<typeof getChainId>;
/** @internal */
export const isGetChainIdAction = getChainId.match;
