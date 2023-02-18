import { createAction2 } from '@owlprotocol/crud-redux';

import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const GET_NONCE = `${name}/GET_NONCE`;
/** @category Actions */
export const getNonceAction = createAction2(GET_NONCE, (payload: ContractId) => {
    return { networkId: payload.networkId, address: payload.address.toLowerCase() }

});
/** @internal */
export type GetNonceAction = ReturnType<typeof getNonceAction>;
/** @internal */
export const isGetNonceAction = getNonceAction.match;
