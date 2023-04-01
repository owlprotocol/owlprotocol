import { put } from "typed-redux-saga";
import {
    Web3SubscribeLogsAction,
    Web3UnsubscribeLogsAction,
    EthLogSubscribeCRUDActions,
} from "@owlprotocol/web3-actions";
import { isWithEventFormat } from "@owlprotocol/web3-models";

export function* web3SubscribeLogsSaga(action: Web3SubscribeLogsAction): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, topics } = payload;
    if (isWithEventFormat(payload)) {
        const eventFormatFull = payload.eventFormatFull;
        yield* put(
            EthLogSubscribeCRUDActions.actions.put({
                networkId,
                address,
                topics,
                eventFormatFull,
                active: true,
            }),
        );
    } else {
        //Raw log subscription
        yield* put(
            EthLogSubscribeCRUDActions.actions.put({
                networkId,
                address,
                topics,
                active: true,
            }),
        );
    }
}

export function* web3UnsubscribeLogsSaga(action: Web3UnsubscribeLogsAction): Generator<any, any> {
    const { payload } = action;
    const { networkId, address, topics } = payload;
    //Raw log subscription
    yield* put(
        EthLogSubscribeCRUDActions.actions.delete({
            networkId,
            address: address ?? "*",
            topic0: topics[0] ?? "*",
            topic1: topics[1] ?? "*",
            topic2: topics[2] ?? "*",
            topic3: topics[3] ?? "*",
        }),
    );
}
