import { createAction2 } from "@owlprotocol/crud-redux";
import { Web3ReduxName } from "../common.js";

export const INITIALIZE = `${Web3ReduxName}/INITIALIZE`;
/**
 * Create contract call
 * @category Actions
 */
export const initialize = createAction2(INITIALIZE, () => undefined);
/** @internal */
export type InitializeAction = ReturnType<typeof initialize>;
/** @internal */
export const isInitializeAction = initialize.match;
