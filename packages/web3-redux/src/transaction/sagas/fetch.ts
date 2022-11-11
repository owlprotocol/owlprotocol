import { put, call } from 'typed-redux-saga';

import NetworkCRUD from '../../network/crud.js';
import { NetworkWithObjects } from '../../network/model/interface.js';
import { fetchSaga as fetchNetworkSaga } from '../../network/sagas/fetch.js';

import { TransactionCRUD } from '../crud.js';
import { Transaction } from '../model/interface.js';

export function* fetchSaga(action: ReturnType<typeof TransactionCRUD.actions.fetch>): Generator<
    any,
    {
        network: NetworkWithObjects;
        transaction: Transaction
    }
> {
    const { payload } = action;
    const { networkId, hash, maxCacheAge } = payload;

    const { network } = yield* call(fetchNetworkSaga, NetworkCRUD.actions.fetch({ networkId }, action.meta.uuid));
    const web3 = network.web3!

    const dbSelected = yield* call(TransactionCRUD.db.get, { networkId, hash });
    if (dbSelected?.updatedAt && Date.now() - dbSelected.updatedAt < maxCacheAge) {
        return { network, transaction: dbSelected }
    }

    const transaction = yield* call(web3.eth.getTransaction, hash);
    const newTransaction = { ...transaction, networkId } as Transaction;
    yield* put(TransactionCRUD.actions.put(newTransaction));
    return { network, transaction: newTransaction }
}
