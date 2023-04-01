import type { Subscription } from "web3-core-subscriptions";
import { EventChannel, eventChannel, END, buffers } from "redux-saga";
import { Log } from "web3-core";

export enum EthLogSubscribeMessageType {
    data = "data",
    error = "error",
    changed = "changed",
    connected = "connected",
}

export interface EthLogSubscribeChannelMessage {
    type: EthLogSubscribeMessageType;
    error?: Error;
    log?: Log;
    id?: string;
}

export function ethLogSubscribeChannel(subscription: Subscription<Log>): EventChannel<EthLogSubscribeChannelMessage> {
    return eventChannel((emitter) => {
        subscription
            .on("data", (log: Log) => {
                emitter({ type: EthLogSubscribeMessageType.data, log });
            })
            .on("changed", (log: Log) => {
                emitter({ type: EthLogSubscribeMessageType.changed, log });
            })
            .on("error", (error: Error) => {
                emitter({ type: EthLogSubscribeMessageType.error, error });
                emitter(END);
            })
            .on("connected", (id: string) => {
                emitter({ type: EthLogSubscribeMessageType.connected, id });
            });

        // The subscriber must return an unsubscribe function
        return () => {
            subscription.unsubscribe();
        };
        //TODO: Buffered channel?
    }, buffers.expanding(10));
}
