import { put, call } from 'typed-redux-saga';
import type { ContractSendMethod } from 'web3-eth-contract';

import { DeployAction, DEPLOY } from '../actions/index.js';
import ContractCRUD from '../crud.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';

const DEPLOY_ERROR = `${DEPLOY}/ERROR`;

export function* deploySaga(action: DeployAction) {
    const { payload } = action;
    const { networkId, abi, bytecode, args, from, label, tags, onSuccess, onError } = payload;
    //Make sure required parameters defined
    if (!networkId) throw new Error('networkId undefined');

    const network = yield* call(loadNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3Sender ?? network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    const web3Contract = new web3.eth.Contract(abi);

    let tx: ContractSendMethod;
    if (!args || args.length == 0) tx = web3Contract.deploy({ data: bytecode });
    else tx = web3Contract.deploy({ data: bytecode, arguments: args });

    //Gas undefined or 0
    const gas = yield* call(tx.estimateGas, { from }); //default gas
    const contract = yield* call(tx.send, { from, gas });
    onSuccess && onSuccess(contract.options.address);
    yield* put(
        ContractCRUD.actions.upsert(
            { networkId, address: contract.options.address, abi, label, tags },
            action.meta.uuid,
        ),
    );
}

export default deploySaga;
