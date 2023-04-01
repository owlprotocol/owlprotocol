import type { AnyAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { EthLogQueryName, EthLogFilterPartial, validateEthLogFilter } from "@owlprotocol/web3-models";

/** @internal */
export const WEB3_GET_PAST_LOGS_RAW = `${EthLogQueryName}/WEB3_GET_PAST_LOGS_RAW`;
/** @internal */
export interface Web3GetPastLogsRawActionInputBase {
    readonly networkId: string;
    readonly address: string | null;
    //Block range
    readonly fromBlock: number;
    readonly toBlock: number;
}

export type Web3GetPastLogsRawActionInput<Filter = any> = Web3GetPastLogsRawActionInputBase &
    EthLogFilterPartial<Filter>;

export function validateWeb3GetPastLogsRawActionInput<T = any>(payload: Web3GetPastLogsRawActionInput<T>) {
    const filter = validateEthLogFilter(payload);

    const { fromBlock, toBlock } = payload;
    const result = {
        ...filter,
        fromBlock,
        toBlock,
    };
    return result;
}
/** @category Actions */
export function web3GetPastLogsRawAction<T = any>(
    payload: Web3GetPastLogsRawActionInput<T>,
    uuid?: string | undefined,
    ts?: number | undefined,
) {
    return {
        type: WEB3_GET_PAST_LOGS_RAW,
        payload: validateWeb3GetPastLogsRawActionInput(payload),
        meta: {
            uuid: uuid ?? uuidv4(),
            ts: ts ?? Date.now(),
        },
    };
}
web3GetPastLogsRawAction.match = (action: AnyAction) => action.type === WEB3_GET_PAST_LOGS_RAW;

/** @internal */
export type Web3GetPastLogsRawAction = ReturnType<typeof web3GetPastLogsRawAction>;
/** @internal */
export const isWeb3GetPastLogsRawAction = web3GetPastLogsRawAction.match;
