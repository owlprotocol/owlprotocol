import { createAction2 } from "@owlprotocol/crud-actions";
import { EthBlockName } from "@owlprotocol/web3-models";

/** @internal */
export const SUBSCRIBE = `${EthBlockName}/SUBSCRIBE`;

/** Subscribe to new block headers. Uses web3.eth.subscribe(). */
/** @internal */
export type SubscribeActionInput =
    | {
          networkId: string;
          /**
           * If specified true, the returned block will contain all transactions as objects. If false it will only contains the transaction hashes.
           * @defaultValue `true`
           */
          returnTransactionObjects?: boolean;
      }
    | string;
/** @category Actions */
export const subscribeAction = createAction2(SUBSCRIBE, (payload: SubscribeActionInput) => {
    return payload;
});

/** @internal */
export type SubscribeAction = ReturnType<typeof subscribeAction>;
/** @internal */
export const isSubscribeAction = subscribeAction.match;
