import { createAction2 } from '@owlprotocol/crud-redux';

import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const INFER_INTERFACE = `${name}/INFER_INTERFACE`;
/** @category Actions */
export const inferInterfaceAction = createAction2(INFER_INTERFACE, (payload: ContractId) => {
    return { networkId: payload.networkId, address: payload.address.toLowerCase() }

});
/** @internal */
export type InferInterfaceAction = ReturnType<typeof inferInterfaceAction>;
/** @internal */
export const isInferInterfaceAction = inferInterfaceAction.match;
