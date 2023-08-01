import type { AnyAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { EthSendName } from "@owlprotocol/web3-models";
import {
    getEthCallAbiAndFormatFull,
    isWithData,
    isWithMethodAbi,
    isWithMethodFormat,
    WithArgs,
    WithData,
    WithMethodAbi,
    WithMethodFormat,
} from "@owlprotocol/web3-models";

/** @internal */
export const WEB3_SEND = `${EthSendName}/WEB3_SEND`;

export interface Web3SendActionInputBase {
    readonly networkId: string;
    readonly to: string;
    readonly from: string;
    readonly value?: string;
    readonly gas?: number;
}

/** @internal */

export type Web3SendActionInput<Args = any> =
    | (Web3SendActionInputBase & WithData)
    | (Web3SendActionInputBase & WithData & WithMethodFormat)
    | (Web3SendActionInputBase & WithData & WithMethodAbi)
    | (Web3SendActionInputBase & WithArgs<Args> & WithMethodFormat)
    | (Web3SendActionInputBase & WithArgs<Args> & WithMethodAbi);

export function validateWeb3SendActionInput<Args = any>(payload: Web3SendActionInput<Args>) {
    //Interface
    let results: ReturnType<typeof getEthCallAbiAndFormatFull> | undefined;
    if (isWithMethodAbi(payload)) {
        results = getEthCallAbiAndFormatFull(payload.methodAbi);
    } else if (isWithMethodFormat(payload)) {
        results = getEthCallAbiAndFormatFull(payload.methodFormatFull);
    }
    const methodFormatFull = results?.methodFormatFull;
    const methodFragment = results?.methodFragment;
    const methodIface = results?.methodIface;

    //Args
    let data: string;
    let args: Args | undefined;
    if (isWithData(payload)) {
        data = payload.data;
        args = methodIface?.decodeFunctionData(methodFragment!, data) as Args;
    } else {
        //Interface MUST be defined if Args
        data = methodIface!.encodeFunctionData(methodFragment!, payload.args as any);
        args = payload.args;
    }

    const to = payload.to.toLowerCase();
    const from = payload.from.toLowerCase();
    const value = payload.value ?? "0";
    const { networkId, gas } = payload;
    return {
        networkId,
        to,
        from,
        methodFormatFull,
        data,
        args,
        gas,
        value,
    };
}

export function web3SendAction<Args = any>(
    payload: Web3SendActionInput<Args>,
    uuid?: string | undefined,
    ts?: number | undefined,
) {
    return {
        type: WEB3_SEND,
        payload: validateWeb3SendActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now(),
        },
    };
}
web3SendAction.match = (action: AnyAction) => action.type === WEB3_SEND;

/** @internal */
export type Web3SendAction<Args extends any[] = any[]> = ReturnType<typeof web3SendAction<Args>>;
/** @internal */
export const isWeb3SendAction = web3SendAction.match;

export function web3SendActionFactory<Args = any>(methodFormatFull: string) {
    return (
        payload: Omit<Web3SendActionInputBase & WithArgs<Args>, "methodFormatFull">,
        uuid?: string | undefined,
        ts?: number | undefined,
    ) => {
        return web3SendAction<Args>({ ...payload, methodFormatFull }, uuid, ts);
    };
}
