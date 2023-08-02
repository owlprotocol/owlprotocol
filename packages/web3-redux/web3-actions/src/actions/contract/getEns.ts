import { createAction2 } from "@owlprotocol/crud-actions";
import { ContractName } from "@owlprotocol/web3-models";
import { ContractId } from "@owlprotocol/web3-models";

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
