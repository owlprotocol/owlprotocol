import type { Action } from "redux";
import { v4 as uuidv4 } from "uuid";
import { EthLogSubscribeName } from "../common.js";
import { WithFilter, WithTopicsArr } from "../../ethlog/model/interface.js";
import { EthLogFilterPartial, validateEthLogFilter } from "../../ethlog/model/EthLogFilter.js";

/** @internal */
export interface Web3SubscribeLogsActionInputBase {
    readonly networkId: string;
    readonly address: string | null;
}

export type Web3SubscribeLogsActionInput<Filter = any> = Web3SubscribeLogsActionInputBase & EthLogFilterPartial<Filter>;

export function validateWeb3SubscribeLogsActionInput<Filter = any>(payload: Web3SubscribeLogsActionInput<Filter>) {
    const filter = validateEthLogFilter(payload);
    const result = {
        ...filter,
    };

    return result;
}

/** @internal */
export const WEB3_SUBSCRIBE_LOGS = `${EthLogSubscribeName}/WEB3_SUBSCRIBE_LOGS`;
export const WEB3_UNSUBSCRIBE_LOGS = `${EthLogSubscribeName}/WEB3_UNSUBSCRIBE_LOGS`;

/** @category Actions */
export function web3SubscribeLogsAction<Filter = any>(
    payload: Web3SubscribeLogsActionInput<Filter>,
    uuid?: string | undefined,
    ts?: number | undefined,
) {
    return {
        type: WEB3_SUBSCRIBE_LOGS,
        payload: validateWeb3SubscribeLogsActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now(),
        },
    };
}
export function web3UnsubscribeLogsAction<T = any>(
    payload: Web3SubscribeLogsActionInput<T>,
    uuid?: string | undefined,
    ts?: number | undefined,
) {
    return {
        type: WEB3_UNSUBSCRIBE_LOGS,
        payload: validateWeb3SubscribeLogsActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now(),
        },
    };
}

web3SubscribeLogsAction.match = (action: Action) => action.type === WEB3_SUBSCRIBE_LOGS;
web3UnsubscribeLogsAction.match = (action: Action) => action.type === WEB3_UNSUBSCRIBE_LOGS;

/** @internal */
export type Web3SubscribeLogsAction = ReturnType<typeof web3SubscribeLogsAction>;
/** @internal */
export type Web3UnsubscribeLogsAction = ReturnType<typeof web3UnsubscribeLogsAction>;

/** @internal */
export const isWeb3SubscribeLogsAction = web3SubscribeLogsAction.match;
/** @internal */
export const isWeb3UnsubscribeLogsAction = web3UnsubscribeLogsAction.match;

export function web3SubscribeLogsActionFactory<Filter = any>(eventFormatFull: string) {
    return (
        payload:
            | Web3SubscribeLogsActionInputBase
            | (Web3SubscribeLogsActionInputBase & (WithTopicsArr | WithFilter<Filter>)),
        uuid?: string | undefined,
        ts?: number | undefined,
    ) => {
        return web3SubscribeLogsAction<Filter>({ ...payload, eventFormatFull }, uuid, ts);
    };
}

export function web3UnsubscribeLogsActionFactory<Filter = any>(eventFormatFull: string) {
    return (
        payload:
            | Web3SubscribeLogsActionInputBase
            | (Web3SubscribeLogsActionInputBase & (WithTopicsArr | WithFilter<Filter>)),
        uuid?: string | undefined,
        ts?: number | undefined,
    ) => {
        return web3UnsubscribeLogsAction<Filter>({ ...payload, eventFormatFull }, uuid, ts);
    };
}
