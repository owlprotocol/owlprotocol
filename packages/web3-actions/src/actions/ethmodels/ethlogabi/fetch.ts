import { createAction2 } from "@owlprotocol/crud-actions";
import { EthLogAbiName } from "@owlprotocol/web3-models";

/** @internal */
export const ETHLOGABI_FETCH = `${EthLogAbiName}/FETCH`;
/** Block fetch action.  Uses web3.eth.getBlock(). */
/** @internal */
export interface FetchEthLogAbiActionInput {
    eventSighash: string;
}
/** @category Actions */
export const fetchEthLogAbiAction = createAction2(ETHLOGABI_FETCH, (payload: FetchEthLogAbiActionInput) => {
    return { ...payload };
});

/** @internal */
export type FetchEthLogAbiAction = ReturnType<typeof fetchEthLogAbiAction>;
