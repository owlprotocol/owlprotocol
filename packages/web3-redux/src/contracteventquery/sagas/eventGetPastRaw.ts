
import { put, call } from 'typed-redux-saga';
import { compact } from 'lodash-es';

import { splitBucket } from './eventGetPastBuckets.js';
import { fetchSaga as fetchContractSaga } from '../../contract/sagas/fetch.js';
import { ContractCRUD } from '../../contract/crud.js';
import { fetchSaga as fetchNetworkSaga } from '../../network/sagas/fetch.js'

import { ContractEventCRUD } from '../../contractevent/crud.js';
import { ContractEventQueryCRUD } from '../crud.js';
import { ContractEvent, fromEventData, fromLogData } from '../../contractevent/model/interface.js';
import { getEventFilterSaga } from '../../contractevent/sagas/getEventFilter.js';
import { NetworkCRUD } from '../../network/crud.js';
import { EventGetPastRawAction, eventGetPastRawAction } from '../actions/eventGetPastRaw.js';

export function* eventGetPastRawSaga(action: EventGetPastRawAction): Generator<
    any,
    {
        events?: ContractEvent[],
        actions?: EventGetPastRawAction[]
    }
> {
    const { payload } = action;
    const { networkId, eventName, filter, fromBlock, toBlock } = payload;
    let address = payload.address ?? '*'
    let topic0: string, topic1: string, topic2: string, topic3: string

    if (address != '*' && eventName) {
        const { index } = yield* call(getEventFilterSaga, { networkId, address, name: eventName, filter })
        topic0 = index.topic0
        topic1 = index.topic1 ?? '*'
        topic2 = index.topic2 ?? '*'
        topic3 = index.topic3 ?? '*'
    } else {
        topic0 = payload.topic0 ?? '*';
        topic1 = payload.topic1 ?? '*';
        topic2 = payload.topic2 ?? '*';
        topic3 = payload.topic3 ?? '*';
    }

    const existingEventQuery = yield* call(ContractEventQueryCRUD.db.get, { networkId, address, topic0, topic1, topic2, topic3, fromBlock, toBlock });
    if (existingEventQuery) {
        //Cached data
        const events = yield* call(ContractEventCRUD.db.bulkGet, existingEventQuery.events ?? []);
        return {
            events: compact(events)
        }
    }

    try {
        if (address != '*' && eventName) {
            //Use Web3.eth.Contract
            const { contract } = yield* call(fetchContractSaga, ContractCRUD.actions.fetch({ networkId, address }, action.meta.uuid));
            const web3Contract = contract.web3Contract!;

            //No cached query
            let options: any = { fromBlock, toBlock }
            if (filter) options = { ...options, filter }
            let eventsData = yield* call([web3Contract, web3Contract.getPastEvents], eventName, options);

            const eventIds = eventsData.map((e) => {
                return { networkId, blockNumber: e.blockNumber, logIndex: e.logIndex };
            });
            const updateQuery = ContractEventQueryCRUD.actions.upsert(
                {
                    networkId, address,
                    topic0, topic1, topic2, topic3,
                    fromBlock, toBlock,
                    eventName,
                    filter,
                    events: eventIds,
                },
                action.meta.uuid,
            );
            yield* put(updateQuery);

            const events = eventsData.map((e) => fromEventData(e, networkId));
            if (eventsData.length > 0) {
                const batch = ContractEventCRUD.actions.putBatched(events, action.meta.uuid);
                yield* put(batch);
            }

            //Return event logs
            return {
                events
            };
        } else {
            //Use Web3.eth.getPastLogs
            const { network } = yield* call(fetchNetworkSaga, NetworkCRUD.actions.fetch({ networkId }, action.meta.uuid));
            const web3 = network.web3!
            let options: any = {
                fromBlock, toBlock,
                topics: [
                    topic0 === '*' ? null : topic0,
                    topic1 === '*' ? null : topic1,
                    topic2 === '*' ? null : topic2,
                    topic3 === '*' ? null : topic3,
                ]
            }
            if (address != '*') options = { ...options, address }
            const logsData = yield* call([web3, web3.eth.getPastLogs], options);

            const eventIds = logsData.map((e) => {
                return { networkId, blockNumber: e.blockNumber, logIndex: e.logIndex };
            });
            const updateQuery = ContractEventQueryCRUD.actions.upsert(
                {
                    networkId, address,
                    topic0, topic1, topic2, topic3,
                    fromBlock, toBlock,
                    eventName,
                    filter,
                    events: eventIds,
                },
                action.meta.uuid,
            );
            yield* put(updateQuery);

            const events = logsData.map((e) => fromLogData(e, networkId));
            if (logsData.length > 0) {
                const batch = ContractEventCRUD.actions.putBatched(events, action.meta.uuid);
                yield* put(batch);
            }

            //Return event logs
            return {
                events
            };
        }
    } catch (error) {
        const err = error as Error;
        //Update query cache
        const updateQuery = ContractEventQueryCRUD.actions.upsert(
            {
                networkId,
                address,
                topic0,
                topic1,
                topic2,
                topic3,
                fromBlock,
                toBlock,
                eventName,
                filter,
                errorId: action.meta.uuid,
            },
            action.meta.uuid,
        );
        yield* put(updateQuery);

        //Returned error: query returned more than 10000 results
        if (err.message === 'Returned error: query returned more than 10000 results') {
            //Dispatch split block query
            const gen = splitBucket(fromBlock, toBlock);
            const actions: EventGetPastRawAction[] = []
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
                        filter
                    },
                    action.meta.uuid,
                )
                actions.push(a);
            }

            return {
                actions
            }
        }
        throw err;
    }
}
