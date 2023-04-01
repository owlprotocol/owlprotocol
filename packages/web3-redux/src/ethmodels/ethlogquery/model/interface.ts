import { isUndefined, omit, omitBy } from "lodash-es";
import { EthLogId } from "../../ethlog/model/interface.js";
import { EthLogFilterPartial, validateEthLogFilter } from "../../ethlog/model/EthLogFilter.js";

export interface EthLogQueryId {
    readonly networkId: string;
    readonly address: string | "*";
    /** Topics */
    readonly topic0: string | "*"; //topic0 = keccak256(name + args)
    readonly topic1: string | "*";
    readonly topic2: string | "*";
    readonly topic3: string | "*";
    /** Block range */
    readonly fromBlock: number;
    readonly toBlock: number;
}

export interface EthLogQueryPartialBase {
    readonly events?: EthLogId[];
    readonly errorId?: string;
    /** Block range */
    readonly fromBlock: number;
    readonly toBlock: number;
}

export type EthLogQueryPartial<Filter = any> = EthLogQueryPartialBase & EthLogFilterPartial<Filter>;

/**
 * Contract event query cache.
 */
export interface EthLogQuery extends EthLogQueryId {
    /** Event format */
    readonly eventFormatFull?: string;
    /** Filter */
    //readonly filter?: Partial<T>;
    /** Results */
    readonly events?: EthLogId[];
    readonly errorId?: string;
}

export type EthLogQueryIndexInput =
    | EthLogQueryId
    | { networkId: string }
    | { networkId: string; address: string }
    | { networkId: string; address: string; topic0: string }
    | { networkId: string; address: string; eventFormatFull: string }
    | {
        networkId: string;
        address: string;
        eventFormatFull: string;
        topic1: string;
        topic2: string;
        topic3: string;
        fromBlock: number;
        toBlock: number;
    };
/**
| { networkId: string, address: string, eventFormatFull: string, topic1: string, topic2: string, fromBlock: number, toBlock: number }
| { networkId: string, address: string, eventFormatFull: string, topic1: string, topic3: string, fromBlock: number, toBlock: number }
| { networkId: string, address: string, eventFormatFull: string, topic2: string, topic3: string, fromBlock: number, toBlock: number }
| { networkId: string, address: string, eventFormatFull: string, topic1: string, topic3: string, fromBlock: number, toBlock: number }
| { networkId: string, address: string, eventFormatFull: string, topic1: string, fromBlock: number, toBlock: number }
| { networkId: string, address: string, eventFormatFull: string, topic2: string, fromBlock: number, toBlock: number }
| { networkId: string, address: string, eventFormatFull: string, topic3: string, fromBlock: number, toBlock: number }
 */

export const EthLogQueryIndex =
    "[networkId+address+topic0+topic1+topic2+topic3+fromBlock+toBlock],\
[networkId+address+eventFormatFull+topic1+topic2+topic3+fromBlock+toBlock]";

/** @internal */
export function validateId({
    networkId,
    address,
    topic0,
    topic1,
    topic2,
    topic3,
    fromBlock,
    toBlock,
}: EthLogQueryId): EthLogQueryId {
    return {
        networkId,
        address: address?.toLowerCase() ?? "*",
        topic0: topic0 ?? "*",
        topic1: topic1 ?? "*",
        topic2: topic2 ?? "*",
        topic3: topic3 ?? "*",
        fromBlock,
        toBlock,
    };
}

export function toPrimaryKey({
    networkId,
    address,
    topic0,
    topic1,
    topic2,
    topic3,
    fromBlock,
    toBlock,
}: EthLogQueryId): [string, string, string, string, string, string, number, number] {
    return [
        networkId,
        address?.toLowerCase() ?? "*",
        topic0 ?? "*",
        topic1 ?? "*",
        topic2 ?? "*",
        topic3 ?? "*",
        fromBlock,
        toBlock,
    ];
}

/** @internal */
export function validateEthLogQuery<Filter = any>(item: EthLogQueryPartial<Filter>): EthLogQuery {
    const filter = validateEthLogFilter(item);
    const { address, topics } = filter;
    const { fromBlock, toBlock, errorId, events } = item;
    const item2: EthLogQuery = {
        ...omit(filter, "topics", "address"),
        address: address ?? "*",
        topic0: topics[0] ?? "*",
        topic1: topics[1] ?? "*",
        topic2: topics[2] ?? "*",
        topic3: topics[3] ?? "*",
        fromBlock,
        toBlock,
        errorId,
        events,
    };

    return omitBy(item2, isUndefined) as unknown as EthLogQuery;
}
