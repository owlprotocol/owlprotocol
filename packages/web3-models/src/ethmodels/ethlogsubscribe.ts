import { isUndefined, omit, omitBy } from "lodash-es";
import { EventChannel } from "redux-saga";
import { EthLogSubscribeChannelMessage } from "./ethlogSubscribeChannel.js";
import { EthLogFilterPartial, validateEthLogFilter } from "./ethlog/EthLogFilter.js";

export interface EthLogSubscribeId {
    readonly networkId: string;
    readonly address: string | "*";
    /** Topics */
    readonly topic0: string | "*"; //topic0 = keccak256(name + args)
    readonly topic1: string | "*";
    readonly topic2: string | "*";
    readonly topic3: string | "*";
}

export interface EthLogSubscribePartialBase {
    readonly active?: boolean;
}

export type EthLogSubscribePartial<Filter = any> = EthLogSubscribePartialBase & EthLogFilterPartial<Filter>;

export interface EthLogSubscribe extends EthLogSubscribeId {
    /** Event format */
    readonly eventFormatFull?: string;
    readonly active: boolean;
}

export interface EthLogSubscribeWithObjects extends EthLogSubscribe {
    readonly subscription?: EventChannel<EthLogSubscribeChannelMessage>;
}

/** @internal */
export function validateIdEthLogSubscribe({
    networkId,
    address,
    topic0,
    topic1,
    topic2,
    topic3,
}: EthLogSubscribeId): EthLogSubscribeId {
    return {
        networkId,
        address: address?.toLowerCase() ?? "*",
        topic0: topic0 ?? "*",
        topic1: topic1 ?? "*",
        topic2: topic2 ?? "*",
        topic3: topic3 ?? "*",
    };
}

export function toPrimaryKeyEthLogSubscribe({
    networkId,
    address,
    topic0,
    topic1,
    topic2,
    topic3,
}: EthLogSubscribeId): [string, string, string, string, string, string] {
    return [networkId, address?.toLowerCase() ?? "*", topic0 ?? "*", topic1 ?? "*", topic2 ?? "*", topic3 ?? "*"];
}

/** @internal */
export function validateEthLogSubscribe<Filter = any>(item: EthLogSubscribePartial<Filter>): EthLogSubscribe {
    const filter = validateEthLogFilter(item);
    const { address, topics } = filter;
    const { active } = item;
    const item2: EthLogSubscribe = {
        ...omit(filter, "topics", "address"),
        address: address ?? "*",
        topic0: topics[0] ?? "*",
        topic1: topics[1] ?? "*",
        topic2: topics[2] ?? "*",
        topic3: topics[3] ?? "*",
        active: active ?? true,
    };

    return omitBy(item2, isUndefined) as unknown as EthLogSubscribe;
}

/** @internal */
export function encodeEthLogSubscribe(item: EthLogSubscribeWithObjects): EthLogSubscribe {
    return omit(item, ["subscription"]);
}

export function validateWithReduxEthLogSubscribe(
    item: EthLogSubscribe,
    //sess: any
): EthLogSubscribeWithObjects {
    /*
    const itemORM: EthLogSubscribeWithObjects | undefined =
        sess.EthLogSubscribe.withId(
            toReduxOrmId(toPrimaryKeyEthLogSubcribe(item))
        );
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

    let subscription: EventChannel<EthLogSubscribeChannelMessage> | undefined;
    //Initialize subscription, forward events
    const networkORM: NetworkWithObjects | undefined = sess.Network.withId(
        item.networkId
    );
    if (networkORM?.web3) {
        const { address, topic0, topic1, topic2, topic3 } = item;
        const options = getEthLogFilter({
            address,
            topic0,
            topic1,
            topic2,
            topic3,
        });
        subscription = eventSubscribeChannel(
            networkORM.web3.eth.subscribe("logs", options)
        );
    }
    */

    return item; //{ ...item, subscription };
}
