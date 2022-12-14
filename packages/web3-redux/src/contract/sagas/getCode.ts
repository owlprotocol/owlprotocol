import { put, call } from 'typed-redux-saga';
import { GetCodeAction } from '../actions/index.js';
import ContractCRUD from '../crud.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';

/** @category Sagas */
export function* getCode(action: GetCodeAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const network = yield* call(loadNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3 ?? network.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    const code: string = yield* call(web3.eth.getCode, address);
    yield* put(ContractCRUD.actions.upsert({ networkId, address, code }, action.meta.uuid));
}

export default getCode;
