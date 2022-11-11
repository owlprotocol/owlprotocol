import { put, call } from 'typed-redux-saga';
import { EthCallCRUD } from '../crud.js';
import { NetworkCRUD } from '../../network/crud.js';
import { fetchSaga as fetchNetwork } from '../../network/sagas/fetch.js'
import type { EthCall } from '../model/interface.js';
import type { NetworkWithObjects } from '../../network/model/interface.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';

export function* fetchSaga(action: ReturnType<typeof EthCallCRUD.actions.fetch>): Generator<
    any,
    {
        network: NetworkWithObjects;
        ethcall: EthCall;
    }
> {
    const { payload } = action;
    const { networkId, to, data, gas, from, defaultBlock, maxCacheAge } = payload;

    const { network } = yield* call(fetchNetwork, NetworkCRUD.actions.fetch({ networkId }));

    const dbSelected = yield* call(EthCallCRUD.db.get, { networkId, to, data });
    if (dbSelected?.updatedAt && Date.now() - dbSelected.updatedAt < maxCacheAge) {
        return { network, ethcall: dbSelected }
    }

    const web3 = network.web3!;
    const fromDefined = from ?? ADDRESS_0;
    const gasDefined = gas ?? (yield* call(web3.eth.estimateGas, { ...payload, from: fromDefined })); //default gas
    //@ts-ignore
    const returnValue: any = yield* call(
        //@ts-ignore
        web3.eth.call,
        { ...payload, gas: gasDefined, from: fromDefined },
        defaultBlock ?? 'latest',
    );

    const ethcall = {
        ...payload,
        returnValue,
        status: 'SUCCESS' as const,
    }

    yield* put(
        EthCallCRUD.actions.upsert(ethcall),
    );

    return { network, ethcall }
}
