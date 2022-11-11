import { put, call } from 'typed-redux-saga';
import { FetchAction } from '../actions/index.js';
import { NetworkCRUD } from '../../network/crud.js'
import { fetchSaga as fetchNetwork } from '../../network/sagas/fetch.js'
import BlockCRUD from '../crud.js';
import { BlockHeader } from '../model/BlockHeader.js';
import { NetworkWithObjects } from '../../network/model/interface.js';

/** @category Sagas */
export function* fetchSaga(action: FetchAction): Generator<
    any,
    {
        network: NetworkWithObjects;
        block: BlockHeader;
    }
> {
    const { payload } = action;
    const { networkId, blockHashOrBlockNumber, returnTransactionObjects, maxCacheAge } = payload;

    const { network } = yield* call(fetchNetwork, NetworkCRUD.actions.fetch({ networkId }));
    const web3 = network.web3!;

    if (typeof blockHashOrBlockNumber === 'number') {
        //Check cache
        const dbSelected = yield* call(BlockCRUD.db.get, { networkId, number: blockHashOrBlockNumber });
        if (dbSelected?.updatedAt && Date.now() - dbSelected.updatedAt <= maxCacheAge) {
            return { network, block: dbSelected }
        }
    }

    //Fetch
    const result = yield* call(
        web3.eth.getBlock,
        blockHashOrBlockNumber,
        returnTransactionObjects ?? false, //default to false
    );
    const block = { ...result, networkId }
    yield* put(BlockCRUD.actions.put(block, action.meta.uuid));
    return { network, block }
}
