import { isUndefined, omitBy } from 'lodash-es';
import { EventData } from 'web3-eth-contract';
import type { AbiItem } from 'web3-utils';

export interface ContractEventId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Block number */
    readonly blockNumber: number;
    /** Unique index within block of event */
    readonly logIndex: number;
}

/**
 * Contract event log.
 * @see [web3.eth.Contract.events](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html#events)
 * @typeParam T optional type for return values. Defaults to `any` object.
 */
export interface ContractEvent<T extends Record<string, any> = Record<string, any>> extends ContractEventId {
    /** Block hash when event was emitted */
    readonly blockHash: string;
    /** Address of contract that emitted event */
    readonly address: string;
    /** Parsed Contract Event */
    /** Event name */
    readonly name?: string;
    readonly abi?: AbiItem;
    /** Return values of event */
    /** TODO: Index returnValues? */
    readonly returnValues?: T;

    /** Raw Log */
    /** Raw non-indexed log data */
    readonly data?: string;
    /** Raw indexed data */
    readonly topics?: string[];
    /** Topics */
    readonly topic0?: string;
    readonly topic1?: string;
    readonly topic2?: string;
    readonly topic3?: string;
}

export type ContractEventIndexInput =
    | ContractEventId
    | { networkId: string; blockNumber: number }
    | { networkId: string }
    | { networkId: string; address: string; topic0: string, topic1: string; topic2: string; topic3: string } //topic0 = keccak256(name + args)
    | { networkId: string; address: string, topic0: string, topic1: string, topic2: string }
    | { networkId: string; address: string, topic0: string, topic2: string, topic3: string }
    | { networkId: string; address: string, topic0: string, topic1: string, topic3: string }
    | { networkId: string; address: string, topic0: string, topic1: string }
    | { networkId: string; address: string, topic0: string, topic2: string }
    | { networkId: string; address: string, topic0: string, topic3: string }
    | { networkId: string; address: string, topic0: string }
    | { networkId: string; address: string, name: string }

export const ContractEventIndex =
    '[networkId+blockNumber+logIndex],\
[networkId+blockNumber],\
[networkId+address+topic0+topic1+topic2+topic3],\
[networkId+address+topic0+topic1+topic2],\
[networkId+address+topic0+topic2+topic3],\
[networkId+address+topic0+topic1+topic3],\
[networkId+address+topic0+topic1],\
[networkId+address+topic0+topic2],\
[networkId+address+topic0+topic3],\
[networkId+address+topic0],\
[networkId+address+name]';

/** @internal */
export function validateId({ networkId, blockNumber, logIndex }: ContractEventId): ContractEventId {
    return { networkId, blockNumber, logIndex };
}

export function toPrimaryKey({ networkId, blockNumber, logIndex }: ContractEventId): [string, number, number] {
    return [networkId, blockNumber, logIndex];
}

/** @internal */
export function validate(item: ContractEvent): ContractEvent {
    //@ts-ignore
    const name = item.name ?? item.event;
    const address = item.address.toLowerCase();
    const topic0 = item.topic0 ?? (item.topics && item.topics.length > 0 ? item.topics[0] : undefined);
    const topic1 = item.topic1 ?? (item.topics && item.topics.length > 1 ? item.topics[1] : undefined);
    const topic2 = item.topic2 ?? (item.topics && item.topics.length > 2 ? item.topics[2] : undefined);
    const topic3 = item.topic3 ?? (item.topics && item.topics.length > 3 ? item.topics[3] : undefined);

    return {
        ...item,
        name,
        address,
        topic0,
        topic1,
        topic2,
        topic3,
    };
}

export function fromEventData(e: EventData, networkId: string): ContractEvent {
    const topics = e.raw.topics;
    const event = {
        ...e,
        networkId,
        address: e.address.toLowerCase(),
        name: e.event,
        topic0: topics[0],
        topic1: topics[1],
        topic2: topics[2],
        topic3: topics[3]
    }
    return omitBy(event, isUndefined) as any;
}

export default ContractEvent;
