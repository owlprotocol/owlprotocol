import { createAction2 } from "@owlprotocol/crud-actions";
import { EthBlockName } from "@owlprotocol/web3-models";

/** @internal */
export const UNSUBSCRIBE = `${EthBlockName}/UNSUBSCRIBE`;
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
