import { toReduxOrmId, T_Encoded_Base } from '@owlprotocol/crud-redux';
import { isUndefined, omit, omitBy } from 'lodash-es';
import type { Log } from 'web3-core';
import type { Subscription } from 'web3-core-subscriptions';
import type { EventData } from 'web3-eth-contract';
import { EventChannel, eventChannel, END, buffers } from 'redux-saga';

import { ContractWithObjects, toPrimaryKey as toContractPrimaryKey } from '../../contract/model/index.js';
import { NetworkWithObjects } from '../../network/model/index.js';


export interface ContractEventSubscribeId {
    readonly networkId: string;
    readonly address: string | '*';
    /** Topics */
    readonly topic0: string | '*'; //topic0 = keccak256(name + args)
    readonly topic1: string | '*';
    readonly topic2: string | '*';
    readonly topic3: string | '*';
}

export interface ContractEventSubscribe<T extends Record<string, any> = Record<string, any>> extends ContractEventSubscribeId, T_Encoded_Base {
    readonly eventName?: string //derived from abi of contract at <address>
    readonly filter?: Partial<T>; //compute filter topics
    readonly active?: boolean
}

export enum SubscribeMessageType {
    data = 'data',
    error = 'error',
    changed = 'changed',
    connected = 'connected',
}

export interface SubscribeChannelMessage {
    type: SubscribeMessageType
    error?: Error;
    event?: EventData | Log;
    id?: string
}

function eventSubscribeChannel(subscription: Subscription<EventData | Log>): EventChannel<SubscribeChannelMessage> {
    return eventChannel((emitter) => {
        subscription
            .on('data', (event: EventData | Log) => {
                emitter({ type: SubscribeMessageType.data, event });
            })
            .on('changed', (event: EventData | Log) => {
                emitter({ type: SubscribeMessageType.changed, event });
            })
            .on('error', (error: Error) => {
                emitter({ type: SubscribeMessageType.error, error });
                emitter(END);
            })
            .on('connected', (id: string) => {
                emitter({ type: SubscribeMessageType.connected, id });
            });

        // The subscriber must return an unsubscribe function
        return () => {
            subscription.unsubscribe();
        };
        //TODO: Buffered channel?
    }, buffers.expanding(10));
}

export interface ContractEventSubscribeWithObjects<T extends Record<string, any> = Record<string, any>> extends ContractEventSubscribe<T> {
    readonly subscription?: EventChannel<SubscribeChannelMessage>
}

export type ContractEventSubscribeIndexInput = |
    ContractEventSubscribeId
    | { networkId: string }
    | { networkId: string, address: string }
    | { networkId: string; address: string, topic0: string, topic1: string, topic2: string }
    | { networkId: string; address: string, topic0: string, topic2: string, topic3: string }
    | { networkId: string; address: string, topic0: string, topic1: string, topic3: string }
    | { networkId: string; address: string, topic0: string, topic1: string }
    | { networkId: string; address: string, topic0: string, topic2: string }
    | { networkId: string; address: string, topic0: string, topic3: string }
    | { networkId: string; address: string, topic0: string }
    | { networkId: string, address: string, eventName: string };

export const ContractEventSubscribeIndex =
    '[networkId+address+topic0+topic1+topic2+topic3],\
[networkId+address+topic0+topic1+topic2],\
[networkId+address+topic0+topic2+topic3],\
[networkId+address+topic0+topic1+topic3],\
[networkId+address+topic0+topic1],\
[networkId+address+topic0+topic2],\
[networkId+address+topic0+topic3],\
[networkId+address+topic0],\
[networkId+address+eventName]';

/** @internal */
export function validateId({ networkId, address, topic0, topic1, topic2, topic3 }: ContractEventSubscribeId): ContractEventSubscribeId {
    return { networkId, address: address?.toLowerCase() ?? '*', topic0: topic0 ?? '*', topic1: topic1 ?? '*', topic2: topic2 ?? '*', topic3: topic3 ?? '*' };
}

export function toPrimaryKey({ networkId, address, topic0, topic1, topic2, topic3 }: ContractEventSubscribeId): [string, string, string, string, string, string] {
    return [networkId, address?.toLowerCase() ?? '*', topic0 ?? '*', topic1 ?? '*', topic2 ?? '*', topic3 ?? '*'];
}

/** @internal */
export function validate({ networkId, address, topic0, topic1, topic2, topic3, eventName, filter, active }: ContractEventSubscribe): ContractEventSubscribe {
    const item = {
        id: toReduxOrmId(toPrimaryKey({ networkId, address, topic0, topic1, topic2, topic3 })),
        networkId, address: address?.toLowerCase() ?? '*', topic0: topic0 ?? '*', topic1: topic1 ?? '*', topic2: topic2 ?? '*', topic3: topic3 ?? '*', eventName, filter,
        active
    }
    return omitBy(item, isUndefined) as unknown as ContractEventSubscribe;
}

/** @internal */
export function encode(item: ContractEventSubscribeWithObjects): ContractEventSubscribe {
    return omit(item, ['subscription']);
}

export function hydrate(item: ContractEventSubscribe, sess: any): ContractEventSubscribeWithObjects {
    const itemORM: ContractEventSubscribeWithObjects | undefined = sess.ContractEventSubscribe.withId(toReduxOrmId(toPrimaryKey(item)))
    //console.debug({ item, itemORM })

    if (!item.active) {
        //Unsubscribe and return as regular
        itemORM?.subscription?.close();
        return item;
    }

    if (itemORM?.active && itemORM.subscription) {
        //Return same subscription, some metadata fields may have changed (eg. eventName) but core subscription params are same
        return { ...item, subscription: itemORM.subscription };
    }

    const topic0 = item.topic0 == '*' ? undefined : item.topic0
    const topic1 = item.topic1 == '*' ? undefined : item.topic1
    const topic2 = item.topic2 == '*' ? undefined : item.topic2
    const topic3 = item.topic3 == '*' ? undefined : item.topic3

    let subscription: EventChannel<SubscribeChannelMessage> | undefined
    //Initialize subscription, forward events
    if (item.address != '*' && item.eventName) {
        //Use contract instance event subscription for extra decoding
        const contractORM: ContractWithObjects | undefined = sess.Contract.withId(
            toReduxOrmId(toContractPrimaryKey({ networkId: item.networkId, address: item.address })),
        );
        //TODO: Assume exists?
        const contractEvent = contractORM?.web3Contract?.events[item.eventName]
        if (item.filter && contractEvent) {
            subscription = eventSubscribeChannel(contractEvent({ filter: item.filter }))
        } else if (contractEvent) {
            subscription = eventSubscribeChannel(contractEvent({ topics: [topic0, topic1, topic2, topic3] }))
        }
    } else {
        //Raw subscription
        const networkORM: NetworkWithObjects | undefined = sess.Network.withId(item.networkId);
        if (networkORM?.web3) {
            //@ts-expect-error
            subscription = eventSubscribeChannel(networkORM.web3.eth.subscribe('logs', { topics: [topic0, topic1, topic2, topic3] }))
        }
    }

    return { ...item, subscription }
}
