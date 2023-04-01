import { createAction2 } from "@owlprotocol/crud-redux";

import { ContractName } from "../common.js";
import { ContractId } from "../model/interface.js";

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
