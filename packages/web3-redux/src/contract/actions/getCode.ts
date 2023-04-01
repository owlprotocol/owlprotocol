import { createAction2 } from "@owlprotocol/crud-redux";

import { ContractName } from "../common.js";
import { ContractId } from "../model/interface.js";

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
