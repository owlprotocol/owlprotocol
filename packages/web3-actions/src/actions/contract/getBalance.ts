import { createAction2 } from "@owlprotocol/crud-actions";

import { ContractName } from "@owlprotocol/web3-models";
import { ContractId } from "@owlprotocol/web3-models";

/** @internal */
export const GET_BALANCE = `${ContractName}/GET_BALANCE`;
/** @category Actions */
export const getBalanceAction = createAction2(GET_BALANCE, (payload: ContractId) => {
    return payload;
});
/** @internal */
export type GetBalanceAction = ReturnType<typeof getBalanceAction>;
/** @internal */
export const isGetBalanceAction = getBalanceAction.match;
