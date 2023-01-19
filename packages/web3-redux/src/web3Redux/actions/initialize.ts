import { createAction } from "@owlprotocol/crud-redux";
import { v4 as uuidv4 } from 'uuid';
import { name } from '../common.js';

export const INITIALIZE = `${name}/INITIALIZE`
/**
 * Create contract call
 * @category Actions
 */
export const initialize = createAction(INITIALIZE, (uuid?: string, ts?: number) => {
    return {
        payload: undefined,
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now()
        }
    }
});
/** @internal */
export type InitializeAction = ReturnType<typeof initialize>;
/** @internal */
export const isInitializeAction = initialize.match;
