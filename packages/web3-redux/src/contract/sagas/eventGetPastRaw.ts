import { put, call } from 'typed-redux-saga';
import { EventData } from 'web3-eth-contract';
import { splitBucket } from './eventGetPast.js';
import eventGetPastRawAction, { EventGetPastRawAction, EVENT_GET_PAST_RAW } from '../actions/eventGetPastRaw.js';
import takeEveryBuffered from '../../sagas/takeEveryBuffered.js';
import ContractCRUD from '../crud.js';
import ContractEventCRUD from '../../contractevent/crud.js';
import ContractEventQueryCRUD from '../../contracteventquery/crud.js';
import { ContractEvent, fromEventData } from '../../contractevent/model/interface.js';
import { fetchSaga } from './fetch.js';
import { NetworkWithObjects } from '../../network/index.js';
import { ContractWithObjects } from '../model/interface.js';
import { compact, isEmpty, isUndefined } from 'lodash-es';

export function* eventGetPastRaw(action: EventGetPastRawAction): Generator<
    any,
    {
        network: NetworkWithObjects,
        contract: ContractWithObjects,
        events?: ContractEvent[],
        actions?: EventGetPastRawAction[]
    }
> {
    const { payload } = action;
    const { networkId, address, eventName, filter, fromBlock, toBlock } = payload;

    const { network, contract } = yield* call(fetchSaga, ContractCRUD.actions.fetch({ networkId, address }, action.meta.uuid, action.meta.ts));
    const web3Contract = contract.web3Contract!;

    const eventQuery = ContractEventQueryCRUD.validate({
        networkId,
        address,
        name: eventName,
        fromBlock,
        toBlock,
        filterHash: isUndefined(filter) || isEmpty(filter) ? '' : JSON.stringify(filter),
    });

    const existingEventQuery = yield* call(ContractEventQueryCRUD.db.get, eventQuery);

    if (!existingEventQuery) {
        try {
            //No cached query
            let eventsData: EventData[];
            if (filter) {
                eventsData = yield* call([web3Contract, web3Contract.getPastEvents], eventName, {
                    filter,
                    fromBlock,
                    toBlock,
                });
            } else {
                eventsData = yield* call([web3Contract, web3Contract.getPastEvents], eventName, {
                    fromBlock,
                    toBlock,
                });
            }

            const eventIds = eventsData.map((e) => {
                return { networkId, blockNumber: e.blockNumber, logIndex: e.logIndex };
            });
            const updateQuery = ContractEventQueryCRUD.actions.upsert(
                {
                    ...eventQuery,
                    events: eventIds,
                },
                action.meta.uuid,
                action.meta.ts
            );
            yield* put(updateQuery);

            const events = eventsData.map((e) => fromEventData(e, networkId));

            if (eventsData.length > 0) {
                const batch = ContractEventCRUD.actions.putBatched(events, action.meta.uuid);
                yield* put(batch);
            }

            //Return event logs
            return {
                network,
                contract,
                events
            };
        } catch (error) {
            const err = error as Error;
            //Update query cache
            const updateQuery = ContractEventQueryCRUD.actions.upsert(
                {
                    ...eventQuery,
                    errorId: action.meta.uuid,
                },
                action.meta.uuid,
                action.meta.ts
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
                            eventName,
                            filter,
                            fromBlock: from,
                            toBlock: to,
                        },
                        action.meta.uuid,
                        action.meta.ts
                    )
                    actions.push(a);
                }

                return {
                    network,
                    contract,
                    actions
                }
            }

            throw err;
        }
    }

    const events = yield* call(ContractEventCRUD.db.bulkGet, existingEventQuery.events ?? []);
    return {
        network,
        contract,
        events: compact(events)
    }
}

export function* watchEventGetPastRaw() {
    yield takeEveryBuffered(EVENT_GET_PAST_RAW, eventGetPastRaw, {
        bufferSize: 5,
        bufferBatchTimeout: 200,
        bufferCompletionTimeout: 5000,
    });
}

export default watchEventGetPastRaw;
