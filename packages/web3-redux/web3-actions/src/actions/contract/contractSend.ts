import type { AnyAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ContractName } from "@owlprotocol/web3-models";
import { Web3SendActionInputBase } from "../ethmodels/ethsend/web3Send.js";

/** @internal */
export const CONTRACT_SEND = `${ContractName}/CONTRACT_SEND`;
/** @internal */
export interface ContractSendActionInput<Args = any> extends Web3SendActionInputBase {
    readonly method: string;
    readonly args: Args;
}

export function validateContractSendActionInput<Args = any>(payload: ContractSendActionInput<Args>) {
    const { to, from } = payload;
    return {
        ...payload,
        to: to.toLowerCase(),
        from: from.toLowerCase(),
    };
}

/**
 * Create contract call
 * @category Actions
 */
export function contractSendAction<Args = any>(
    payload: ContractSendActionInput<Args>,
    uuid?: string | undefined,
    ts?: number | undefined,
) {
    return {
        type: CONTRACT_SEND,
        payload: validateContractSendActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now(),
        },
    };
}
contractSendAction.match = (action: AnyAction) => action.type === CONTRACT_SEND;
/** @internal */
export type ContractSendAction = ReturnType<typeof contractSendAction>;
/** @internal */
export const isContractSendAction = contractSendAction.match;
