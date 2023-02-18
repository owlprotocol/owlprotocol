/**
 * TODO
 * - onCreate/Update/Upsert/Put
 *      - newValue.active == true && !subscription.active => Start subscription
 *      - newValue.active == false && subscription.active => Stop subscription
 *      - Move saga from contract to contracteventsubscribe
 *
 * - Subscription hydrated => Use selector to add listener to subscription
 *
 */
import { put, take, fork, select } from 'typed-redux-saga';
import { ContractEventSubscribeCRUD } from "../crud.js";
import { ContractEventSubscribe, ContractEventSubscribeId, SubscribeChannelMessage, SubscribeMessageType } from '../model/interface.js';
import { ContractEventCRUD } from '../../contractevent/crud.js';

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof ContractEventSubscribeCRUD.actions.dbCreating>): Generator<
    any,
    any
> {
    //Handle contract creation
    const { payload } = action;
    if (payload.obj.active) {
        //Redux
        yield* put(ContractEventSubscribeCRUD.actions.reduxUpsert(payload.obj))
        yield* fork(startSubscribe, payload.obj)
    }
}

export function* dbUpdatingSaga(action: ReturnType<typeof ContractEventSubscribeCRUD.actions.dbUpdating>): Generator<
    any,
    any
> {
    //Handle contract creation
    const { payload } = action;
    if ('active' in payload.mods) {
        //Redux
        yield* put(ContractEventSubscribeCRUD.actions.reduxUpsert({ ...payload.obj, ...payload.mods }))
        if (payload.mods.active) yield* fork(startSubscribe, { ...payload.obj, ...payload.mods })
        else yield* fork(endSubscribe, { ...payload.obj, ...payload.mods })
    }
}

export function* dbDeletingSaga(action: ReturnType<typeof ContractEventSubscribeCRUD.actions.dbDeleting>): Generator<
    any,
    any
> {
    const { payload } = action;
    if (payload.obj) {
        const { networkId, address, topic0, topic1, topic2, topic3 } = payload.obj
        yield* put(ContractEventSubscribeCRUD.actions.reduxDelete({ networkId, address, topic0, topic1, topic2, topic3 }))
    }
}

export function* startSubscribe({ networkId, address, topic0, topic1, topic2, topic3, eventName }: ContractEventSubscribe): Generator<
    any,
    any
> {
    //Select redux subscripton
    const item = yield* select(ContractEventSubscribeCRUD.selectors.selectByIdSingle, { networkId, address, topic0, topic1, topic2, topic3 })
    const subscription = item?.subscription
    //console.debug({ networkId, address, topic0, topic1, topic2, topic3, subscription })
    if (subscription) {
        while (true) {
            const message: SubscribeChannelMessage = yield* take(subscription);
            const { type, event, error } = message;
            if (type === SubscribeMessageType.data && event) {
                yield* put(
                    ContractEventCRUD.actions.upsert({
                        ...event,
                        networkId,
                        name: eventName,
                    }),
                );
            } else if (type === SubscribeMessageType.error) {
                yield* put({ type: SubscribeMessageType.error, error });
            } else if (type === SubscribeMessageType.changed && event) {
                yield* put(
                    ContractEventCRUD.actions.upsert({
                        ...event,
                        networkId,
                        name: eventName,
                    }),
                );
            }
        }
    }
}

export function* endSubscribe({ networkId, address, topic0, topic1, topic2, topic3 }: ContractEventSubscribeId): Generator<
    any,
    any
> {
    //Select redux subscripton
    const item = yield* select(ContractEventSubscribeCRUD.selectors.selectByIdSingle, { networkId, address, topic0, topic1, topic2, topic3 })
    const subscription = item?.subscription
    if (subscription) {
        subscription.close()
    }
}
