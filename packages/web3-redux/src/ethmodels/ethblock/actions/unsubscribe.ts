import { createAction2 } from "@owlprotocol/crud-redux";
import { EthBlock } from "../common.js";

/** @internal */
export const UNSUBSCRIBE = `${EthBlock}/UNSUBSCRIBE`;
/** @internal */
export type UnsubscribeActionInput =
    | {
          networkId: string;
      }
    | string;
/** @category Actions */
export const unsubscribeAction = createAction2(UNSUBSCRIBE, (payload: UnsubscribeActionInput) => {
    return payload;
});

/** @internal */
export type UnsubscribeAction = ReturnType<typeof unsubscribeAction>;
/** @internal */
export const isUnsubscribeAction = unsubscribeAction.match;
