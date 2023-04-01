import { put, call, select } from "typed-redux-saga";
import { GetBlockNumberAction } from "../actions/index.js";
import { NetworkCRUD } from "../crud.js";
import { NetworkWithObjects } from "../model/interface.js";

/**
 * Get network current block number.
 * - If block number undefined, fetch
 * - If network is using block sync, return current max
 * - If maxCacheAge || blockTime is specified, return based on cache livenes (or fetch)
 * @param action
 * @returns
 */
export function* getBlockNumberSaga(action: GetBlockNumberAction): Generator<
    any,
    {
        network: NetworkWithObjects;
        latestBlockNumber: number;
    }
> {
    const { payload } = action;
    const { networkId } = payload;

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);
    const web3 = network?.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    //1. Undefined latestBlockNumber
    if (!network.latestBlockNumber) {
        const latestBlockNumber = yield* call(web3.eth.getBlockNumber);
        yield* put(NetworkCRUD.actions.update({ networkId, latestBlockNumber }, action.meta.uuid));
        return { network, latestBlockNumber };
    }

    //2. Syncing blocks
    if (network.syncBlocks) {
        return { network, latestBlockNumber: network.latestBlockNumber };
    }

    //3. Stale maxCacheAge
    const maxCacheAge = payload.maxCacheAge ?? network.blockTime;
    if (maxCacheAge && network?.updatedAt && Date.now() - network.updatedAt > maxCacheAge) {
        //stale cache
        const latestBlockNumber = yield* call(web3.eth.getBlockNumber);
        yield* put(NetworkCRUD.actions.update({ networkId, latestBlockNumber }, action.meta.uuid));
        return { network, latestBlockNumber };
    }

    return { network, latestBlockNumber: network.latestBlockNumber };
}
