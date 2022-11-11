import { put as putSaga, call, select } from 'typed-redux-saga';
import { NetworkCRUD } from '../crud.js';
import { defaultNetworks } from '../defaults.js';
import { NetworkWithObjects } from '../model/interface.js';

export function* fetchSaga(action: ReturnType<typeof NetworkCRUD.actions.fetch>): Generator<
    any,
    {
        network: NetworkWithObjects;
    }
> {
    const { payload } = action;
    const { networkId, web3Rpc, web3 } = payload;

    const reduxSelected = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
    if ((web3Rpc && web3Rpc != reduxSelected?.web3Rpc) || web3 && web3 != reduxSelected?.web3) {
        //Update values
        console.debug('Insert web3')
        yield* putSaga(NetworkCRUD.actions.upsert(payload, action.meta.uuid));
        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
        if (!network?.web3) throw Error(`No network ${networkId}`);
        return { network };
    }

    if (reduxSelected?.web3) {
        //Return current web3 instance
        return { network: reduxSelected };
    }

    const dbSelected = yield* call(NetworkCRUD.db.get, networkId);
    if (web3Rpc && web3Rpc != dbSelected?.web3Rpc) {
        //Update values
        yield* putSaga(NetworkCRUD.actions.upsert(payload, action.meta.uuid));
        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
        if (!network?.web3) throw Error(`No network ${networkId}`);
        return { network };
    }

    if (dbSelected?.web3Rpc) {
        //Hydrate
        yield* putSaga(NetworkCRUD.actions.upsert(dbSelected, action.meta.uuid));
        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
        if (!network?.web3) throw Error(`No network ${networkId}`);
        return { network };
    }

    const defaultNetworkForId = defaultNetworks()[networkId];
    if (defaultNetworkForId) {
        //Default values, auto merge in the upsert action with default network values
        yield* putSaga(NetworkCRUD.actions.upsert(payload, action.meta.uuid));
        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
        if (!network?.web3) throw Error(`No network ${networkId}`);
        return { network };
    }

    throw Error(`No network ${networkId}`);
}
