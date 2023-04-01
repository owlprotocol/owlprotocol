import type { Action } from "redux";
import { v4 as uuidv4 } from "uuid";
import { WithFilter, WithTopicsArr } from "../../ethlog/model/interface.js";
import { EthLogQueryName } from "../common.js";
import { EthLogFilterPartial, validateEthLogFilter } from "../../ethlog/model/EthLogFilter.js";

/** @internal */
export const WEB3_GET_PAST_LOGS = `${EthLogQueryName}/WEB3_GET_PAST_LOGS`;
/** @internal */
export interface Web3GetPastLogsActionInputBase {
    readonly networkId: string;
    readonly address: string | null;
    //Block range
    readonly fromBlock?: number | "earliest";
    readonly toBlock?: number | "latest";
    readonly blocks?: number;
    //Max events
    readonly maxEvents?: number;
    //Concurrent requests
    readonly maxConcurrentRequests?: number;
}

export type Web3GetPastLogsActionInput<Filter = any> = Web3GetPastLogsActionInputBase & EthLogFilterPartial<Filter>;

export function validateWeb3GetPastLogsActionInput<Filter = any>(payload: Web3GetPastLogsActionInput<Filter>) {
    const filter = validateEthLogFilter(payload);

    //Range
    let fromBlock: number | undefined;
    if (payload.fromBlock == "earliest") {
        fromBlock = 0;
    } else {
        fromBlock = payload.fromBlock;
    }

    let toBlock: number | "latest";
    if (!payload.toBlock || payload.toBlock === "latest") {
        toBlock = "latest";
    } else {
        toBlock = payload.toBlock;
    }

    const maxEvents = payload.maxEvents ?? 100;
    const maxConcurrentRequests = payload.maxConcurrentRequests ?? 6;
    const blocks = payload.blocks;

    const result = {
        ...filter,
        fromBlock,
        toBlock,
        blocks,
        maxEvents,
        maxConcurrentRequests,
    };
    return result;
}

/** @category Actions */
export function web3GetPastLogsAction<Filter = any>(
    payload: Web3GetPastLogsActionInput<Filter>,
    uuid?: string | undefined,
    ts?: number | undefined,
) {
    return {
        type: WEB3_GET_PAST_LOGS,
        payload: validateWeb3GetPastLogsActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now(),
        },
    };
}
web3GetPastLogsAction.match = (action: Action) => action.type === WEB3_GET_PAST_LOGS;

/** @internal */
export type Web3GetPastLogsAction = ReturnType<typeof web3GetPastLogsAction>;
/** @internal */
export const isWeb3GetPastLogsAction = web3GetPastLogsAction.match;

export function web3GetPastLogsActionFactory<Filter = any>(eventFormatFull: string) {
    return (
        payload:
            | Web3GetPastLogsActionInputBase
            | (Web3GetPastLogsActionInputBase & (WithTopicsArr | WithFilter<Filter>)),
        uuid?: string | undefined,
        ts?: number | undefined,
    ) => {
        return web3GetPastLogsAction<Filter>({ ...payload, eventFormatFull }, uuid, ts);
    };
}
