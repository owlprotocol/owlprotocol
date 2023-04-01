import { v4 as uuidv4 } from "uuid";
import type { Action } from "redux";
import { EthCallName } from "../common.js";
import {
    getEthCallAbiAndFormatFull,
    isWithData,
    isWithMethodAbi,
    isWithMethodFormat,
    WithArgs,
    WithData,
    WithMethodAbi,
    WithMethodFormat,
} from "../model/interface.js";

/** @internal */
export const WEB3_CALL = `${EthCallName}/WEB3_CALL`;

export interface Web3CallActionInputBase {
    readonly networkId: string;
    readonly to: string;
    readonly from?: string;
    readonly gas?: number;
    readonly maxCacheAge?: number;
    readonly defaultBlock?: number | "latest";
    readonly batch?: boolean;
    readonly batchMulticall?: boolean;
}

export type Web3CallActionInput<Args = any> =
    | (Web3CallActionInputBase & WithData)
    | (Web3CallActionInputBase & WithData & WithMethodFormat)
    | (Web3CallActionInputBase & WithData & WithMethodAbi)
    | (Web3CallActionInputBase & WithArgs<Args> & WithMethodFormat)
    | (Web3CallActionInputBase & WithArgs<Args> & WithMethodAbi);

export function validateWeb3CallActionInput<Args = any>(payload: Web3CallActionInput<Args>) {
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
    const from = payload.from?.toLowerCase() ?? "0x0000000000000000000000000000000000000000";
    const maxCacheAge = payload.maxCacheAge ?? 0;
    const defaultBlock = payload.defaultBlock ?? "latest";
    const { networkId, gas, batch, batchMulticall } = payload;
    return {
        networkId,
        to,
        from,
        methodFormatFull,
        data,
        args,
        maxCacheAge,
        defaultBlock,
        gas,
        batch,
        batchMulticall,
    };
}

export function web3CallAction<Args = any>(
    payload: Web3CallActionInput<Args>,
    uuid?: string | undefined,
    ts?: number | undefined,
) {
    return {
        type: WEB3_CALL,
        payload: validateWeb3CallActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now(),
        },
    };
}
web3CallAction.match = (action: Action) => action.type === WEB3_CALL;

/** @internal */
export type Web3CallAction<Args extends any[] = any[]> = ReturnType<typeof web3CallAction<Args>>;
/** @internal */
export const isWeb3CallAction = web3CallAction.match;

export function web3CallActionFactory<Args = any>(methodFormatFull: string) {
    return (payload: Web3CallActionInputBase & WithArgs<Args>, uuid?: string | undefined, ts?: number | undefined) => {
        return web3CallAction<Args>({ ...payload, methodFormatFull }, uuid, ts);
    };
}
