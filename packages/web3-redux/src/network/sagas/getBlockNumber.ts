import { put, call } from 'typed-redux-saga';
import { fetchSaga as fetchNetwork } from './fetch.js';
import { GetBlockNumberAction } from '../actions/index.js';
import NetworkCRUD from '../crud.js';
import { NetworkWithObjects } from '../model/interface.js';

export function* getBlockNumber(action: GetBlockNumberAction): Generator<
    any,
    {
        network: NetworkWithObjects;
        latestBlockNumber: number;
    }
> {
    const { payload } = action;
    const { networkId, maxCacheAge } = payload;

    const { network } = yield* call(fetchNetwork, NetworkCRUD.actions.fetch({ networkId }, action.meta.uuid));
    if (network.latestBlockNumber && network?.updatedAt && Date.now() - network.updatedAt < maxCacheAge) {
        return { network, latestBlockNumber: network.latestBlockNumber }
    }

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const latestBlockNumber = yield* call(web3.eth.getBlockNumber);
    yield* put(NetworkCRUD.actions.update({ networkId, latestBlockNumber }, action.meta.uuid));

    return { network, latestBlockNumber }
}
