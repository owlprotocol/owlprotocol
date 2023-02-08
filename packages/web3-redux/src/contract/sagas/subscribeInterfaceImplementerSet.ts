import * as Contracts from '@owlprotocol/contracts';
import { all, call, fork, put } from 'typed-redux-saga'
import {
    SubscribeInterfaceImplementerSetAction,
    eventGetPast as eventGetPastAction, getSupportsInterface,
    eventSubscribe as eventSubscribeAction
} from "../actions/index.js";
import { ContractCRUD } from "../crud.js";
import { fetchSaga } from "./fetch.js";
import { eventGetPastInterfaceImplementerSet } from './eventGetPast.js';
import eventSubscribe from './eventSubscribe.js';

export function* subscribeInterfaceImplementerSet(action: SubscribeInterfaceImplementerSetAction): Generator<
    any,
    {
        addresses: string[];
    }
> {
    const { payload } = action;
    const { networkId } = payload;
    const address = Contracts.Utils.ERC1820.registryAddress

    yield* call(fetchSaga, ContractCRUD.actions.fetch({
        networkId,
        address,
        abi: Contracts.Artifacts.IERC1820Registry.abi
    }))

    const events = yield* call(eventGetPastInterfaceImplementerSet, eventGetPastAction({
        networkId,
        address,
        eventName: 'InterfaceImplementerSet',
    }, action.meta.uuid))

    const addresses = [...new Set(events.map((e) => e.address))]

    const actions = addresses.map((a) => {
        return getSupportsInterface({
            networkId,
            address: a
        })
    })

    const subscription = yield* fork(eventSubscribe, eventSubscribeAction({
        networkId,
        address,
        eventName: 'InterfaceImplementerSet',
    }))

    yield* all(actions.map((a) => put(a)))



    return { addresses }
}
