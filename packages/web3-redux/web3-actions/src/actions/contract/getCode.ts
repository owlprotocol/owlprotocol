import { createAction2 } from "@owlprotocol/crud-actions";

import { ContractName } from "@owlprotocol/web3-models";
import { ContractId } from "@owlprotocol/web3-models";

/** @internal */
export const GET_CODE = `${ContractName}/GET_CODE`;
/** @category Actions */
export const getCodeAction = createAction2(GET_CODE, (payload: ContractId) => {
    return {
        networkId: payload.networkId,
        address: payload.address.toLowerCase(),
    };
});
/** @internal */
export type GetCodeAction = ReturnType<typeof getCodeAction>;
/** @internal */
export const isGetCodeAction = getCodeAction.match;
