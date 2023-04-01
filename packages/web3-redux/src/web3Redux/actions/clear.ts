import { createAction2 } from "@owlprotocol/crud-redux";
import { Web3ReduxName } from "../common.js";

export const CLEAR = `${Web3ReduxName}/CLEAR`;
/**
 * Create contract call
 * @category Actions
 */
export const clear = createAction2(CLEAR, () => undefined);
/** @internal */
export type ClearAction = ReturnType<typeof clear>;
/** @internal */
export const isClearAction = clear.match;
