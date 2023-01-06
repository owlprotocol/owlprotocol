import { isEmpty, isNull, omitBy } from 'lodash-es';
import { call } from 'typed-redux-saga';
import type { AbiInput, AbiItem } from 'web3-utils';
import { ContractCRUD } from '../../contract/crud.js';
import { fetchSaga as fetchContractSaga } from '../../contract/sagas/fetch.js'
import { coder } from '../../utils/web3-eth-abi/index.js';

export interface GetEventFilter {
    networkId: string,
    address: string,
    name: string,
    filter?: Record<string, any>
}

export interface EventFilter {
    index: {
        networkId: string,
        address: string,
        topic0: string,
        topic1?: string
        topic2?: string,
        topic3?: string,
    }
    filter?: Record<string, any>
}

export function getEventFilter({ networkId, address, filter }: Omit<GetEventFilter, 'name'>, event: AbiItem): EventFilter {
    //console.debug({ networkId, address, filter, event })
    //Topic0 based on event signature
    const topic0 = coder.encodeEventSignature(event)

    if (filter) {
        const filter2 = { ...filter }
        const topicInputs: AbiInput[] = []
        event.inputs!.forEach((a) => {
            if (a.indexed) {
                topicInputs.push(a)
                //Remove indexed filter keys top encode as topics
                delete filter2[a.name]
            }
        })

        //Additional topics
        const topics: [string, string | null, string | null, string | null] = [topic0, null, null, null]
        topicInputs.map((a, i) => {
            if (filter[a.name]) {
                const encoded = coder.encodeParameter(a.type, filter[a.name])
                topics[i + 1] = encoded
            }
        })

        const index = {
            networkId,
            address,
            topic0: topics[0],
            topic1: topics[1],
            topic2: topics[2],
            topic3: topics[3],
        }
        const indexDefined = omitBy(index, isNull) as EventFilter['index']

        return {
            index: indexDefined,
            filter: isEmpty(filter2) ? undefined : filter2
        }
    }

    return {
        index: {
            networkId,
            address,
            topic0
        },
    }
}
/**
 * Use contract abi to get event filter by topics.
 */
export function* getEventFilterSaga({ networkId, address, name, filter }: GetEventFilter): Generator<
    any,
    EventFilter
> {
    const { contract } = yield* call(fetchContractSaga, ContractCRUD.actions.fetch({ networkId, address }));
    const event = contract.abi!.find((a) => a.type === 'event' && a.name === name)!

    return getEventFilter({ networkId, address, filter }, event)
}
