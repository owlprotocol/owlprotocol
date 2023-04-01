import { createAction2 } from "@owlprotocol/crud-actions";

import { ContractId, ERC165Name } from "@owlprotocol/web3-models";

/** @internal */
export const INFER_INTERFACE = `${ERC165Name}/INFER_INTERFACE`;
/** @category Actions */
export const inferInterfaceAction = createAction2(
    INFER_INTERFACE,
    (payload: ContractId & { interfaceCheckedAtMaxCacheAge?: number }) => {
        return {
            networkId: payload.networkId,
            address: payload.address.toLowerCase(),
            //TODO: Fix sync to use ERC1820 when possible
            interfaceCheckedAtMaxCacheAge: payload.interfaceCheckedAtMaxCacheAge ?? 0,
        };
    },
);
/** @internal */
export type InferInterfaceAction = ReturnType<typeof inferInterfaceAction>;
/** @internal */
export const isInferInterfaceAction = inferInterfaceAction.match;
