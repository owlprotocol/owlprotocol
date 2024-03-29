import type { AnyAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ContractName } from "@owlprotocol/web3-models";
import type { Web3CallActionInputBase } from "../ethmodels/ethcall/web3Call.js";

/** @internal */
export const CONTRACT_CALL = `${ContractName}/CONTRACT_CALL`;
/** @internal */
export interface ContractCallActionInput<Args extends any[] = any[]> extends Web3CallActionInputBase {
    readonly method: string;
    readonly args: Args;
}

export function validateContractCallActionInput<Args extends any[] = any[]>(payload: ContractCallActionInput<Args>) {
    const { to } = payload;
    return {
        ...payload,
        to: to.toLowerCase(),
        maxCacheAge: payload.maxCacheAge ?? 0,
        defaultBlock: payload.defaultBlock ?? "latest",
        from: payload.from ?? "0x0000000000000000000000000000000000000000",
    };
}
/**
 * Create contract call
 * @category Actions
 */
export function contractCallAction<Args extends any[] = any[]>(
    payload: ContractCallActionInput<Args>,
    uuid?: string | undefined,
    ts?: number | undefined,
) {
    return {
        type: CONTRACT_CALL,
        payload: validateContractCallActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now(),
        },
    };
}
contractCallAction.match = (action: AnyAction) => action.type === CONTRACT_CALL;

/** @internal */
export type ContractCallAction<Args extends any[] = any[]> = ReturnType<typeof contractCallAction<Args>>;
/** @internal */
export const isContractCallAction = contractCallAction.match;
