import { createAction2 } from "@owlprotocol/crud-actions";
import { EthCallAbiName } from "@owlprotocol/web3-models";

/** @internal */
export const ETHCALLABI_FETCH = `${EthCallAbiName}/FETCH`;
/** Block fetch action.  Uses web3.eth.getBlock(). */
/** @internal */
export interface FetchEthCallAbiActionInput {
    methodSighash: string;
}
/** @category Actions */
export const fetchEthCallAbiAction = createAction2(ETHCALLABI_FETCH, (payload: FetchEthCallAbiActionInput) => {
    return { ...payload };
});

/** @internal */
export type FetchEthCallAbiAction = ReturnType<typeof fetchEthCallAbiAction>;
