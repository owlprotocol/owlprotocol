import { BaseSync } from "./BaseSync.js";

/**
 * Sync middleware to handle [EthLog](./ethmodels/ethlog.EthLog-1) CREATE/UPDATE actions.
 */
export interface EventSync extends BaseSync {
    type: "Event";
    matchAddress: string;
    matchName: string;
    matchReturnValues?: { [k: string]: any } | { [k: string]: any }[];
}

export function createEventSync(
    id: string,
    networkId: string,
    actions: EventSync["actions"],
    matchAddress: string,
    matchName: string,
    matchReturnValues?: EventSync["matchReturnValues"],
): EventSync {
    return {
        id,
        type: "Event",
        networkId,
        actions,
        matchAddress,
        matchName,
        matchReturnValues,
    };
}
