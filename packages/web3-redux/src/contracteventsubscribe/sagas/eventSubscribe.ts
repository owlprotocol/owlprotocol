import { call, put } from 'typed-redux-saga';
import { getEventFilterSaga } from '../../contractevent/sagas/getEventFilter.js';
import { EventSubscribeAction, EventUnSubscribeAction } from '../actions/eventSubscribe.js';
import { ContractEventSubscribeCRUD } from "../crud.js"

export function* eventSubscribe(action: EventSubscribeAction): Generator<
    any,
    any
> {

    const { payload } = action;
    let { networkId, topic0, topic1, topic2, topic3, eventName, filter } = payload
    let address = payload.address ?? '*'

    if (address != '*' && eventName) {
        const { index } = yield* call(getEventFilterSaga, { networkId, address, name: eventName, filter })
        yield* put(ContractEventSubscribeCRUD.actions.create({
            networkId,
            address,
            topic0: index.topic0,
            topic1: index.topic1 ?? '*',
            topic2: index.topic2 ?? '*',
            topic3: index.topic3 ?? '*',
            eventName,
            filter,
            active: true
        }))

    } else {
        //Raw log subscription
        yield* put(ContractEventSubscribeCRUD.actions.create({
            networkId,
            address,
            topic0: topic0 ?? '*',
            topic1: topic1 ?? '*',
            topic2: topic2 ?? '*',
            topic3: topic3 ?? '*',
            active: true
        }))
    }
}

export function* eventUnSubscribe(action: EventUnSubscribeAction): Generator<
    any,
    any
> {

    const { payload } = action;
    let { networkId, topic0, topic1, topic2, topic3, eventName, filter } = payload
    let address = payload.address ?? '*'

    if (address != '*' && eventName) {
        const { index } = yield* call(getEventFilterSaga, { networkId, address, name: eventName, filter })
        yield* put(ContractEventSubscribeCRUD.actions.delete({
            networkId,
            address,
            topic0: index.topic0,
            topic1: index.topic1 ?? '*',
            topic2: index.topic2 ?? '*',
            topic3: index.topic3 ?? '*',
        }))

    } else {
        //Raw log subscription
        yield* put(ContractEventSubscribeCRUD.actions.delete({
            networkId,
            address,
            topic0: topic0 ?? '*',
            topic1: topic1 ?? '*',
            topic2: topic2 ?? '*',
            topic3: topic3 ?? '*'
        }))
    }
}
