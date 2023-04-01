import { createAction2 } from "@owlprotocol/crud-actions";

export const Web3ReduxName = "Web3Redux";
export const INITIALIZE = `${Web3ReduxName}/INITIALIZE`;
/**
 * Create contract call
 * @category Actions
 */
export const initialize = createAction2(INITIALIZE, () => undefined);
/** @internal */
export type InitializeAction = ReturnType<typeof initialize>;

export const CLEAR = `${Web3ReduxName}/CLEAR`;
/**
 * Create contract call
 * @category Actions
 */
export const clear = createAction2(CLEAR, () => undefined);
/** @internal */
export type ClearAction = ReturnType<typeof clear>;
