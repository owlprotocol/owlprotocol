import { createAction2 } from "@owlprotocol/crud-redux";
import { ContractName } from "../common.js";
import { ContractId } from "../model/interface.js";

/** @internal */
export const GET_ENS = `${ContractName}/GET_ENS`;
/** @category Actions */
export const getEnsAction = createAction2(GET_ENS, (payload: ContractId) => {
    return { networkId: payload.networkId, address: payload.address.toLowerCase() };
});
/** @internal */
export type GetEnsAction = ReturnType<typeof getEnsAction>;
/** @internal */
export const isGetEnsAction = getEnsAction.match;
