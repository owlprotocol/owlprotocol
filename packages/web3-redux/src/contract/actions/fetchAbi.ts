import { createAction2 } from "@owlprotocol/crud-redux";

import { ContractName } from "../common.js";
import { ContractId } from "../model/interface.js";

/** @internal */
export const FETCH_ABI = `${ContractName}/FETCH_ABI`;
/** @category Actions */
export const fetchAbi = createAction2(FETCH_ABI, (payload: ContractId) => {
    return payload;
});
/** @internal */
export type FetchAbiAction = ReturnType<typeof fetchAbi>;
/** @internal */
export const isFetchAbiAction = fetchAbi.match;
