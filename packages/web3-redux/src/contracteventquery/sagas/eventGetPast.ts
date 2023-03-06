import { call, all } from 'typed-redux-saga';
import * as Contracts from '@owlprotocol/contracts';

import { ContractEvent } from '../../contractevent/model/interface.js';
import { eventGetPastRawSaga } from './eventGetPastRaw.js';
import { getBlockNumberSaga } from '../../network/sagas/getBlockNumber.js';
import { getBlockNumberAction } from '../../network/actions/getBlockNumber.js';
import { findBuckets } from './eventGetPastBuckets.js';
import { EventGetPastAction } from '../actions/eventGetPast.js';
import { eventGetPastRawAction } from '../actions/eventGetPastRaw.js';


/** Batches event requests into EventGetPastRaw actions */
export function* eventGetPastSaga(action: EventGetPastAction): Generator<
    any,
    ContractEvent[]
> {
    const { payload } = action;
    const { networkId, address, topic0, topic1, topic2, topic3, fromBlock, toBlock, eventName, filter, blocks, maxEvents, maxConcurrentRequests } = payload;

    //Ranged queries
    let toBlockInitial: number;
    if (!toBlock || toBlock === 'latest') {
        const { latestBlockNumber } = yield* call(getBlockNumberSaga, getBlockNumberAction({ networkId }, action.meta.uuid));
        toBlockInitial = latestBlockNumber;
    } else {
        toBlockInitial = toBlock;
    }

    let fromBlockInitial: number;
    if (fromBlock === undefined) {
        if (blocks) fromBlockInitial = Math.max(toBlockInitial - blocks, 0);
        else fromBlockInitial = 0;
    } else {
        fromBlockInitial = fromBlock;
    }

    const gen = findBuckets(fromBlockInitial, toBlockInitial);
    let tasks: ReturnType<typeof eventGetPastRawSaga>[] = []
    for (const { from, to } of gen) {
        const a = eventGetPastRawAction(
            {
                networkId,
                address,
                topic0,
                topic1,
                topic2,
                topic3,
                fromBlock: from,
                toBlock: to,
                eventName,
                filter,
            },
            action.meta.uuid,
        )
        const t = call(eventGetPastRawSaga, a);
        tasks.push(t);
    }

    const events: ContractEvent[] = []
    while (tasks.length > 0) {
        let tasksBatch: ReturnType<typeof eventGetPastRawSaga>[] = []
        //Create new batch
        for (let i = 0; i < Math.min(tasks.length, maxConcurrentRequests); i++) {
            const t = tasks.shift()
            tasksBatch.push(t!)
        }

        const results = yield* all(tasksBatch);
        for (const r of results) {
            if (r.events) {
                //Yield events, no recursive query needed
                events.push(...events)
                yield r.events;
            } else if (r.actions) {
                //No events, add to tasks array
                r.actions.forEach((a) => {
                    tasks.push(call(eventGetPastRawSaga, a));
                });
            }
        }
        if (events.length > maxEvents) break;
    }

    return events
}

/**
 * Create version of eventGetPastSaga with typed event signature, and default event name.
 * @param eventName
 * @returns
 */
export function eventGetPastFactory<T extends Record<string, any> = Record<string, any>>(eventName: string) {
    return (action: EventGetPastAction): Generator<
        any,
        ContractEvent<T>[]
    > => {
        const payload = { ...action.payload, eventName }
        return eventGetPastSaga({ type: action.type, payload, meta: { ...action.meta } }) as Generator<
            any,
            ContractEvent<T>[]
        >
    }
}

//IERC1820
export const eventGetPastInterfaceImplementerSet = eventGetPastFactory<Contracts.Web3.InterfaceImplementerSetEvent['returnValues']>('InterfaceImplementerSet')
//IAccessControl
export const eventGetPastIAccessControlRoleAdminChanged = eventGetPastFactory<Contracts.Web3.RoleAdminChangedEvent['returnValues']>('RoleAdminChanged')
export const eventGetPastIAccessControlRoleGranted = eventGetPastFactory<Contracts.Web3.RoleGrantedEvent['returnValues']>('RoleGranted')
export const eventGetPastIAccessControlRoleRevoked = eventGetPastFactory<Contracts.Web3.RoleRevokedEvent['returnValues']>('RoleRevoked')

//Assets
export const eventGetPastIERC20Transfer = eventGetPastFactory<Contracts.Web3.IERC20TransferEvent['returnValues']>('Transfer')
export const eventGetPastIERC721Transfer = eventGetPastFactory<Contracts.Web3.IERC721TransferEvent['returnValues']>('Transfer')
export const eventGetPastIERC1155TransferSingle = eventGetPastFactory<Contracts.Web3.IERC1155TransferSingleEvent['returnValues']>('TransferSingle')
export const eventGetPastIERC1155TransferBatch = eventGetPastFactory<Contracts.Web3.IERC1155TransferBatchEvent['returnValues']>('TransferBatch')

//IERC721TopDown
export const eventGetPastIERC721TopDownSetChild721 = eventGetPastFactory<Contracts.Web3.IERC721TopDownSetChild721Event['returnValues']>('SetChild721')
export const eventGetPastIERC721TopDownAttachedChild1155 = eventGetPastFactory<Contracts.Web3.IERC721TopDownAttachedChild1155Event['returnValues']>('AttachedChild1155')
export const eventGetPastIERC721TopDownDetachedChild1155 = eventGetPastFactory<Contracts.Web3.IERC721TopDownDetachedChild1155Event['returnValues']>('DetachedChild1155')

//AssetRouter
export const eventGetPastAssetRouterSupportsInputAsset = eventGetPastFactory<Contracts.Web3.SupportsInputAsset['returnValues']>('SupportsInputAsset')
export const eventGetPastAssetRouterSupportsOutputAsset = eventGetPastFactory<Contracts.Web3.SupportsOutputAsset['returnValues']>('SupportsOutputAsset')
export const eventGetPastAssetRouterRouteBasket = eventGetPastFactory<Contracts.Web3.RouteBasket['returnValues']>('RouteBasket')
export const eventGetPastAssetRouterUpdateBasket = eventGetPastFactory<Contracts.Web3.UpdateBasket['returnValues']>('UpdateBasket')
