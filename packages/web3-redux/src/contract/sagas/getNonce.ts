import { put, call } from 'typed-redux-saga';
import { NetworkCRUD } from '../../network/crud.js'
import { fetchSaga as fetchNetworkSaga } from '../../network/sagas/fetch.js'

import { InferInterfaceAction } from '../actions/index.js';
import { ContractCRUD } from '../crud.js';

/** @category Sagas */
export function* getNonce(action: InferInterfaceAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const contract = yield* call(ContractCRUD.db.get, { networkId, address })

    const { network } = yield* call(fetchNetworkSaga, NetworkCRUD.actions.fetch({ networkId }, action.meta.uuid));
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    //@ts-expect-error
    const nonceStr: string = yield* call([web3, web3.eth.getTransactionCount], address);
    const nonce = parseInt(nonceStr)
    if (nonce != contract?.nonce) {
        yield* put(ContractCRUD.actions.upsert({ networkId, address, nonce }, action.meta.uuid));
    }
}
