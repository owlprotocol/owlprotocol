import { isUndefined, omitBy } from 'lodash-es';
import { ContractEventId } from '../../contractevent/model/index.js';

export interface ContractEventQueryId {
    readonly networkId: string;
    readonly address: string | '*';
    /** Topics */
    readonly topic0: string | '*'; //topic0 = keccak256(name + args)
    readonly topic1: string | '*';
    readonly topic2: string | '*';
    readonly topic3: string | '*';
    readonly fromBlock: number;
    readonly toBlock: number;
}

/**
 * Contract event query cache.
 */
export interface ContractEventQuery<T extends Record<string, any> = Record<string, any>> extends ContractEventQueryId {
    readonly eventName?: string
    readonly filter?: Partial<T>;
    readonly events?: ContractEventId[];
    readonly errorId?: string;
}

export type ContractEventQueryIndexInput = |
    ContractEventQueryId
    | { networkId: string, address: string, eventName: string, fromBlock: number, toBlock: number };

export const ContractEventQueryIndex =
    '[networkId+address+topic0+topic1+topic2+topic3+fromBlock+toBlock],\
[networkId+address+eventName+fromBlock+toBlock]';

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
}: ContractEventQueryId): ContractEventQueryId {
    return {
        networkId,
        address: address?.toLowerCase() ?? '*',
        topic0: topic0 ?? '*',
        topic1: topic1 ?? '*',
        topic2: topic2 ?? '*',
        topic3: topic3 ?? '*',
        fromBlock, toBlock
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
}: ContractEventQueryId): [string, string, string, string, string, string, number, number] {
    return [networkId, address?.toLowerCase() ?? '*', topic0 ?? '*', topic1 ?? '*', topic2 ?? '*', topic3 ?? '*', fromBlock, toBlock];
}

/** @internal */
export function validate({ networkId, address, topic0, topic1, topic2, topic3, fromBlock, toBlock, eventName, filter, events, errorId }: ContractEventQuery): ContractEventQuery {
    const item = {
        networkId, address: address?.toLowerCase() ?? '*',
        topic0: topic0 ?? '*', topic1: topic1 ?? '*', topic2: topic2 ?? '*', topic3: topic3 ?? '*',
        fromBlock, toBlock,
        eventName, filter, events, errorId
    }
    return omitBy(item, isUndefined) as unknown as ContractEventQuery;
}
