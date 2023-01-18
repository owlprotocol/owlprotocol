import { put, call } from 'typed-redux-saga';
import type { ContractSendMethod } from 'web3-eth-contract';
import * as Contracts from '@owlprotocol/contracts';
import { constants } from 'ethers';
import { keccak256 } from '../../utils/web3-utils/index.js';

import { DeployAction, DEPLOY, DeployType, isDeployRegular, isDeployInitialize, isDeployProxy1167, isDeployProxyBeacon } from '../actions/index.js';
import ContractCRUD from '../crud.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';
import { fetchSaga } from './fetch.js';
import { BeaconProxy, ERC1167Factory, NonPayableTransactionObject, UpgradeableBeacon } from '@owlprotocol/contracts/lib/types/web3/types.js';
import { ContractWithObjects } from '../model/interface.js';
import { NetworkWithObjects } from '../../network/index.js';

const DEPLOY_ERROR = `${DEPLOY}/ERROR`;

export function* deploySaga(action: DeployAction) {
    const { payload } = action;
    const { networkId, abi, args, from, label, tags,
        deployType,
        onSuccess, onError } = payload;
    //Make sure required parameters defined
    if (!networkId) throw new Error('networkId undefined');

    const network = yield* call(loadNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3Sender ?? network.web3;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    const web3Contract = new web3.eth.Contract(abi);
    if (isDeployRegular(payload)) {
        let tx: ContractSendMethod;
        const { bytecode } = payload
        if (!bytecode) {
            throw new Error('REGULAR deploy with undefined bytecode!');
        }

        if (!args || args.length == 0) tx = web3Contract.deploy({ data: bytecode });
        else tx = web3Contract.deploy({ data: bytecode, arguments: args });

        const gas = yield* call(tx.estimateGas, { from }); //default gas
        const contract = yield* call(tx.send, { from, gas });
        onSuccess && onSuccess(contract.options.address.toLowerCase());
        yield* put(
            ContractCRUD.actions.upsert(
                { networkId, address: contract.options.address, abi, label, tags },
                action.meta.uuid,
            ),
        );
    } else {
        let address: string;
        const { deploySalt, deploySaltSenderDeterministic } = payload
        const msgSender = deploySaltSenderDeterministic ? from : constants.AddressZero;

        //TODO: Check contract exists
        let tx: NonPayableTransactionObject<any>// | undefined;
        const { contract: deployer } = (yield* call(fetchSaga, ContractCRUD.actions.fetch({
            networkId,
            address: Contracts.Utils.ERC1167Factory.ERC1167FactoryAddress.toLowerCase(),
            abi: Contracts.Artifacts.ERC1167Factory.abi
        }, action.meta.uuid))) as { network: NetworkWithObjects, contract: ContractWithObjects<ERC1167Factory> };
        if (!deployer.web3SenderContract) {
            throw new Error(`deployer.web3SenderContract at ${Contracts.Utils.ERC1167Factory.ERC1167FactoryAddress} undefined!`)
        }

        if (isDeployInitialize(payload)) {
            const { bytecode } = payload
            if (!bytecode) {
                throw new Error('INITIALIZE deploy with undefined bytecode!');
            }
            const initData = web3Contract.methods.initialize(...(args ?? [])).encodeABI() as string
            const initSalt = Contracts.Utils.ERC1167Factory.getSalt({ salt: deploySalt, initData, msgSender });
            address = Contracts.Utils.Create2.computeAddress(initSalt, keccak256(bytecode), Contracts.Utils.ERC1167Factory.ERC1167FactoryAddress);
            tx = deployer.web3SenderContract.methods.deployDeterministic(deploySalt!, bytecode, initData, msgSender);
        } else if (isDeployProxy1167(payload)) {
            const { deployImplementationAddress } = payload
            if (!deployImplementationAddress) {
                throw new Error('PROXY_1167 deploy with undefined bytecode!');
            }
            const initData = web3Contract.methods.initialize(...(args ?? [])).encodeABI() as string
            const initSalt = Contracts.Utils.ERC1167Factory.getSalt({ salt: deploySalt, initData, msgSender });
            address = Contracts.Utils.Clones.predictDeterministicAddress(deployImplementationAddress, initSalt, Contracts.Utils.ERC1167Factory.ERC1167FactoryAddress);
            tx = deployer.web3SenderContract.methods.cloneDeterministic(deployImplementationAddress, deploySalt!, initData, msgSender);
        } else if (isDeployProxyBeacon(payload)) {
            const { deployBeaconAddress } = payload
            if (!deployBeaconAddress) {
                throw new Error('PROXY_BEACON deploy with undefined bytecode!');
            }
            const initData = web3Contract.methods.proxyInitialize(...(args ?? [])).encodeABI() as string
            const beaconProxy = new web3.eth.Contract(Contracts.Artifacts.BeaconProxy.abi) as unknown as BeaconProxy;
            const beaconInitData = beaconProxy.methods.initialize(from, deployBeaconAddress, initData).encodeABI()
            const initSalt = Contracts.Utils.ERC1167Factory.getSalt({ salt: deploySalt, initData: beaconInitData, msgSender });
            address = Contracts.Utils.Create2.computeAddress(initSalt, keccak256(Contracts.Artifacts.BeaconProxy.bytecode), Contracts.Utils.ERC1167Factory.ERC1167FactoryAddress);
            tx = deployer.web3SenderContract.methods.deployDeterministic(deploySalt!, Contracts.Artifacts.BeaconProxy.bytecode, beaconInitData, msgSender);
        } else {
            throw new Error(`Unsupported deploy type ${deployType}`)
        }

        //Gas undefined or 0
        const gas = yield* call(tx.estimateGas, { from }); //default gas
        const receipt = yield* call(tx.send, { from, gas });
        onSuccess && onSuccess(address.toLowerCase(), receipt);
        yield* put(
            ContractCRUD.actions.upsert(
                { networkId, address, abi, label, tags },
                action.meta.uuid,
            ),
        );
    }
}

export default deploySaga;
