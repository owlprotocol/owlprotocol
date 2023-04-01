import { interfaces } from "@owlprotocol/contracts";
import { utils } from "ethers";
import { isUndefined, omitBy } from "lodash-es";
import type { AbiItem } from "web3-utils";
import { mapDeepBigNumberToString } from "../../../utils/mapDeepBigNumberToString.js";

export interface WithDataTopics<Topics = string[]> extends WithTopicsArr<Topics> {
    readonly data: string;
}
export interface WithTopicsArr<Topics = (string | null)[]> {
    readonly topics: Topics;
}
export interface WithTopicsIdx {
    readonly topic0: string | "*";
    readonly topic1: string | "*";
    readonly topic2: string | "*";
    readonly topic3: string | "*";
}
export interface WithReturnValues<Ret = any> {
    readonly returnValues: Ret;
}
export interface WithFilter<Ret = any> {
    readonly filter: Ret;
}
export interface WithEventAbi {
    readonly eventAbi: AbiItem;
}
export interface WithEventFormat {
    readonly eventFormatFull: string;
}

export interface EthLogId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Block number */
    readonly blockNumber: number;
    /** Unique index within block of event */
    readonly logIndex: number;
}

export interface EthLogPartialBase extends EthLogId {
    /** Block hash when event was emitted */
    readonly blockHash: string;
    /** Address of contract that emitted event */
    readonly address: string;
}
export type EthLogPartial<Ret = any> =
    | (EthLogPartialBase &
          WithDataTopics &
          //eslint-disable-next-line @typescript-eslint/ban-types
          (WithEventAbi | WithEventFormat | {}))
    | (EthLogPartialBase & WithReturnValues<Ret> & (WithEventAbi | WithEventFormat));

export function isWithTopics(item: any): item is WithTopicsArr {
    return !!(item as WithTopicsArr).topics;
}

export function isWithDataTopics(item: any): item is WithDataTopics {
    return !!(item as WithDataTopics).data && !!(item as WithDataTopics).topics;
}
export function isWithReturnValues(item: any): item is WithReturnValues {
    return !!(item as WithReturnValues).returnValues;
}
export function isWithFilter(item: any): item is WithFilter {
    return !!(item as WithFilter).filter;
}
export function isWithEventAbi(item: any): item is WithEventAbi {
    return !!(item as WithEventAbi).eventAbi;
}
export function isWithEventFormat(item: any): item is WithEventFormat {
    return !!(item as WithEventFormat).eventFormatFull;
}
export function isWithTopicsIdx(item: any): item is WithTopicsIdx {
    return (
        !!(item as WithTopicsIdx).topic0 ||
        !!(item as WithTopicsIdx).topic1 ||
        !!(item as WithTopicsIdx).topic2 ||
        !!(item as WithTopicsIdx).topic3
    );
}

/**
 * Contract event log.
 * @see [web3.eth.Contract.events](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html#events)
 * @typeParam T optional type for return values. Defaults to `any` object.
 */
export interface EthLog<Ret = any> extends EthLogId {
    /** Block hash when event was emitted */
    readonly blockHash: string;
    /** Address of contract that emitted event */
    readonly address: string;
    /** Event format */
    readonly eventFormatFull?: string;
    /** Return values of event */
    readonly returnValues?: Ret;
    readonly data: string;
    /** Topics */
    readonly topics: string[];
    readonly topic0?: string;
    readonly topic1?: string;
    readonly topic2?: string;
    readonly topic3?: string;
}

export interface EthLogContractFilterBase {
    networkId: string;
    address: string;
}

export type EthLogContractFilter<Ret = any> =
    | EthLogContractFilterBase & (WithEventFormat | WithEventAbi) & Partial<WithFilter<Ret>>;

export type EthLogIndexByContractInput =
    | {
          networkId: string;
          address: string;
          eventFormatFull: string;
          topic1: string;
          topic2: string;
          topic3: string;
      } //topic0 = keccak256(name + args)
    | {
          networkId: string;
          address: string;
          eventFormatFull: string;
          topic1: string;
          topic2: string;
      }
    | {
          networkId: string;
          address: string;
          eventFormatFull: string;
          topic2: string;
          topic3: string;
      }
    | {
          networkId: string;
          address: string;
          eventFormatFull: string;
          topic1: string;
          topic3: string;
      }
    | {
          networkId: string;
          address: string;
          eventFormatFull: string;
          topic1: string;
      }
    | {
          networkId: string;
          address: string;
          eventFormatFull: string;
          topic2: string;
      }
    | {
          networkId: string;
          address: string;
          eventFormatFull: string;
          topic3: string;
      }
    | { networkId: string; address: string; eventFormatFull: string };

export type EthLogIndexInput =
    | EthLogId
    | EthLogIndexByContractInput
    | { networkId: string; blockNumber: number }
    | { networkId: string }
    | {
          eventFormatFull: string;
          topic1: string;
          topic2: string;
          topic3: string;
      }
    | { eventFormatFull: string; topic1: string; topic2: string }
    | { eventFormatFull: string; topic2: string; topic3: string }
    | { eventFormatFull: string; topic1: string; topic3: string }
    | { eventFormatFull: string; topic1: string }
    | { eventFormatFull: string; topic2: string }
    | { eventFormatFull: string; topic3: string }
    | { eventFormatFull: string };

export type EthLogIndexByContractInputAnyOf =
    | {
          networkId: string[] | string;
          address: string[] | string;
          eventFormatFull: string[] | string;
          topic1: string[] | string;
          topic2: string[] | string;
          topic3: string[] | string;
      } //topic0 = keccak256(name + args)
    | {
          networkId: string[] | string;
          address: string[] | string;
          eventFormatFull: string[] | string;
          topic1: string[] | string;
          topic2: string[] | string;
      }
    | {
          networkId: string[] | string;
          address: string[] | string;
          eventFormatFull: string[] | string;
          topic2: string[] | string;
          topic3: string[] | string;
      }
    | {
          networkId: string[] | string;
          address: string[] | string;
          eventFormatFull: string[] | string;
          topic1: string[] | string;
          topic3: string[] | string;
      }
    | {
          networkId: string[] | string;
          address: string[] | string;
          eventFormatFull: string[] | string;
          topic1: string[] | string;
      }
    | {
          networkId: string[] | string;
          address: string[] | string;
          eventFormatFull: string[] | string;
          topic2: string[] | string;
      }
    | {
          networkId: string[] | string;
          address: string[] | string;
          eventFormatFull: string[] | string;
          topic3: string[] | string;
      }
    | {
          networkId: string[] | string;
          address: string[] | string;
          eventFormatFull: string[] | string;
      };

export type EthLogIndexInputAnyOf =
    | {
          networkId: string[] | string;
          blockNumber: number[] | number;
          logIndex: string[] | string;
      }
    | EthLogIndexByContractInputAnyOf
    | { networkId: string[] | string; blockNumber: number[] | number }
    | { networkId: string[] }
    | {
          eventFormatFull: string[] | string;
          topic1: string[] | string;
          topic2: string[] | string;
          topic3: string[] | string;
      }
    | {
          eventFormatFull: string[] | string;
          topic1: string[] | string;
          topic2: string[] | string;
      }
    | {
          eventFormatFull: string[] | string;
          topic2: string[] | string;
          topic3: string[] | string;
      }
    | {
          eventFormatFull: string[] | string;
          topic1: string[] | string;
          topic3: string[] | string;
      }
    | { eventFormatFull: string[] | string; topic1: string[] | string }
    | { eventFormatFull: string[] | string; topic2: string[] | string }
    | { eventFormatFull: string[] | string; topic3: string[] | string }
    | { eventFormatFull: string[] | string };

export const EthLogIndex =
    "[networkId+blockNumber+logIndex],\
[networkId+blockNumber],\
[networkId+address+eventFormatFull+topic1+topic2+topic3],\
[networkId+address+eventFormatFull+topic1+topic2],\
[networkId+address+eventFormatFull+topic2+topic3],\
[networkId+address+eventFormatFull+topic1+topic3],\
[networkId+address+eventFormatFull+topic1],\
[networkId+address+eventFormatFull+topic2],\
[networkId+address+eventFormatFull+topic3],\
[networkId+address+eventFormatFull],\
[networkId+address],\
[eventFormatFull+topic1+topic2+topic3],\
[eventFormatFull+topic1+topic2],\
[eventFormatFull+topic2+topic3],\
[eventFormatFull+topic1+topic3],\
[eventFormatFull+topic1],\
[eventFormatFull+topic2],\
[eventFormatFull+topic3],\
[eventFormatFull]";

/** @internal */
export function validateId({ networkId, blockNumber, logIndex }: EthLogId): EthLogId {
    return { networkId, blockNumber, logIndex };
}

export function toPrimaryKey({ networkId, blockNumber, logIndex }: EthLogId): [string, number, number] {
    return [networkId, blockNumber, logIndex];
}

interface getEthLogAbiAndFormatFullReturn {
    eventAbi: AbiItem;
    eventFormatFull: string;
    eventFragment: utils.EventFragment;
    eventIface: utils.Interface;
    topic0: string;
}
export function getEthLogAbiAndFormatFull(eventAbi: AbiItem): getEthLogAbiAndFormatFullReturn;
export function getEthLogAbiAndFormatFull(eventFormatFull: string): getEthLogAbiAndFormatFullReturn;
export function getEthLogAbiAndFormatFull(eventAbiOrFormatFull: AbiItem | string): getEthLogAbiAndFormatFullReturn {
    let eventAbi: AbiItem;
    let eventFormatFull: string;

    if (typeof eventAbiOrFormatFull === "string") eventFormatFull = eventAbiOrFormatFull;
    else {
        eventAbi = eventAbiOrFormatFull;
        eventFormatFull = utils.EventFragment.from(eventAbi as any).format(utils.FormatTypes.full);
    }

    eventFormatFull = eventFormatFull.replace("event ", "");
    const eventFragment = utils.EventFragment.from(eventFormatFull);
    const eventIface = new utils.Interface([eventFragment]);
    eventAbi = JSON.parse(eventFragment.format(utils.FormatTypes.json)) as AbiItem;
    const topic0 = eventIface.getEventTopic(eventFragment);

    return {
        eventAbi,
        eventFormatFull,
        eventFragment,
        eventIface,
        topic0,
    };
}

export function indexedTopicsLengthMatch(topics: (string | null)[], eventFragment: utils.EventFragment): boolean {
    const indexedTopics = eventFragment.inputs.filter((f) => f.indexed);
    if (topics.length === indexedTopics.length - 1) {
        //Same indexed inputs
        return true;
    }
    return false;
}

export function inferEthLogFormatFullFromIface(topics: (string | null)[], iface: utils.Interface): string | undefined {
    const topic0 = topics[0];

    Object.values(iface.events).forEach((e) => {
        if (topic0 === iface.getEventTopic(e)) {
            if (indexedTopicsLengthMatch(topics, e)) {
                //Same topic and indexed inputs
                return e.format(utils.FormatTypes.full).replace("event ", "");
            }
        }
    });

    return undefined;
}

export function inferEthLogFormatFull(topics: (string | null)[]): string | undefined {
    for (const e of Object.values(interfaces)) {
        const eventFormatFull = inferEthLogFormatFullFromIface(topics, e.interface);
        if (eventFormatFull) return eventFormatFull;
    }

    return undefined;
}

export function validateEthLogContractFilter<Ret = any>(item: EthLogContractFilter<Ret>): EthLogIndexByContractInput {
    //Interface
    let results: ReturnType<typeof getEthLogAbiAndFormatFull>;
    if (isWithEventAbi(item)) {
        results = getEthLogAbiAndFormatFull(item.eventAbi);
    } else {
        results = getEthLogAbiAndFormatFull(item.eventFormatFull);
    }

    const eventFormatFull = results.eventFormatFull;
    const eventFragment = results.eventFragment;
    const eventIface = results.eventIface;

    //Decode filter
    const r = eventIface!.encodeEventLog(eventFragment!, item.filter as any);
    const topics = r.topics;
    const [, topic1, topic2, topic3] = topics;
    const { networkId, address } = item;

    return {
        networkId,
        address,
        eventFormatFull,
        topic1,
        topic2,
        topic3,
    };
}

/** @internal */
export function validateEthLog(item: EthLogPartial): EthLog {
    const address = item.address.toLowerCase();

    //Interface
    let results: ReturnType<typeof getEthLogAbiAndFormatFull> | undefined;
    if (isWithEventAbi(item)) {
        results = getEthLogAbiAndFormatFull(item.eventAbi);
    } else if (isWithEventFormat(item)) {
        results = getEthLogAbiAndFormatFull(item.eventFormatFull);
    } else {
        const eventFormatFull = inferEthLogFormatFull(item.topics);
        if (eventFormatFull) {
            results = getEthLogAbiAndFormatFull(eventFormatFull);
        }
    }

    const eventFormatFull = results?.eventFormatFull;
    const eventFragment = results?.eventFragment;
    const eventIface = results?.eventIface;

    //Data
    let data: string;
    let topics: string[];
    let returnValues: any;
    if (isWithDataTopics(item)) {
        data = item.data;
        topics = item.topics;
        if (eventIface && eventFragment) {
            returnValues = eventIface.decodeEventLog(eventFragment, data, topics);
            returnValues = mapDeepBigNumberToString(returnValues);
        }
    } else {
        //Format MUST be defined if returnValues provided
        const r = eventIface!.encodeEventLog(eventFragment!, item.returnValues as any);
        data = r.data;
        topics = r.topics;
    }

    const [topic0, topic1, topic2, topic3] = topics;
    const item2: EthLog = {
        ...item,
        address,
        eventFormatFull,
        data,
        returnValues,
        topics,
        topic0,
        topic1,
        topic2,
        topic3,
    };

    return omitBy(item2, isUndefined) as EthLog;
}
