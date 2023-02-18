import { put, call } from 'typed-redux-saga';
import { GetCodeAction } from '../actions/index.js';
import { ContractCRUD } from '../crud.js';
import { NetworkCRUD } from '../../network/crud.js'
import { fetchSaga as fetchNetworkSaga } from '../../network/sagas/fetch.js';

/** @category Sagas */
export function* getCodeSaga(action: GetCodeAction): Generator<any, { code: string }> {
    const { payload } = action;
    const { networkId, address } = payload;

    const contract = yield* call(ContractCRUD.db.get, { networkId, address })
    if (contract?.code) return { code: contract.code } //code is static

    const { network } = yield* call(fetchNetworkSaga, NetworkCRUD.actions.fetch({ networkId }, action.meta.uuid));
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const code: string = yield* call([web3, web3.eth.getCode], address);
    yield* put(ContractCRUD.actions.upsert({ networkId, address, code }, action.meta.uuid));

    return { code }
}
