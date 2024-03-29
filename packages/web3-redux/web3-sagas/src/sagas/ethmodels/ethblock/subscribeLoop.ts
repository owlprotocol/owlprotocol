import { take, cancel, fork } from "typed-redux-saga";
import { isSubscribeAction, isUnsubscribeAction } from "@owlprotocol/web3-actions";
import { SubscribeAction } from "@owlprotocol/web3-actions";
import { UnsubscribeAction } from "@owlprotocol/web3-actions";
import { subscribeSaga } from "./subscribe.js";

export function* subscribeLoop() {
    const subscribed: { [key: string]: boolean } = {};
    const tasks: { [key: string]: any } = {};

    const pattern = (action: { type: string }) => {
        return isSubscribeAction(action) || isUnsubscribeAction(action);
    };

    while (true) {
        const action = (yield* take(pattern)) as unknown as SubscribeAction | UnsubscribeAction;

        if (isSubscribeAction(action)) {
            const { payload } = action;
            let networkId: string;
            if (typeof payload === "string") networkId = payload;
            else networkId = payload.networkId;

            if (!subscribed[networkId]) {
                //Only one active subscription per network
                //TODO: Allow editing of subscription params (auto-cancel)
                subscribed[networkId] = true;
                tasks[networkId] = yield* fork(subscribeSaga, action);
            }
        } else if (isUnsubscribeAction(action)) {
            const { payload } = action;
            const networkId = (payload as { networkId?: string }).networkId ?? (payload as string);

            if (subscribed[networkId]) {
                subscribed[networkId] = false;
                yield* cancel(tasks[networkId]);
            }
        }
    }
}
