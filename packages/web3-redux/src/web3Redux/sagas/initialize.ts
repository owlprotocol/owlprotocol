import { all, call } from 'typed-redux-saga';
import { Artifacts, Ethers, Utils } from "@owlprotocol/contracts";
import { utils } from 'ethers'

import { NetworkCRUD } from "../../network/crud.js";
import { fetchSaga as fetchNetworkSaga } from '../../network/sagas/fetch.js'
import { defaultNetworks } from '../../network/defaults.js'
import { Network } from "../../network/model/interface.js";

import { InitializeAction } from "../actions/index.js";
import { Contract } from '../../contract/model/interface.js';
import { fetchSaga as fetchContractSaga } from '../../contract/sagas/fetch.js'

import type { AbiItem } from '../../utils/web3-utils/index.js';
import { ContractCRUD } from '../../contract/crud.js';

export function* initializeSaga(action: InitializeAction): Generator<any, any, any> {

    //Networks
    const networks = Object.values(defaultNetworks()) as Network[]
    const networksFetch = networks.map((n) => call(fetchNetworkSaga, NetworkCRUD.actions.fetch(n)));
    yield* all(networksFetch)

    //Contracts
    const contracts: Contract[] = [];
    networks.forEach((n) => {
        const contractERC1167Factory = {
            networkId: n.networkId,
            address: Utils.ERC1167Factory.ERC1167FactoryAddress.toLowerCase(),
            abi: Artifacts.ERC1167Factory.abi,
            label: 'ERC1167Factory',
            tags: ['Infrastructure']
        }
        const contractERC1820Registry = {
            networkId: n.networkId,
            address: Utils.ERC1820.registryAddress.toLowerCase(),
            abi: Artifacts.IERC1820Registry.abi,
            label: 'IERC1820Registry',
            tags: ['Infrastructure']
        }
        const contractsImplementation = Object.entries(Ethers.implementationFactories).map(([k, f]) => {
            return {
                networkId: n.networkId,
                address: f.getAddress().toLowerCase(),
                abi: JSON.parse(f.interface.format(utils.FormatTypes.json) as string) as AbiItem[],
                label: `${k}Implementation`,
                tags: ['Implementation']
            }
        })
        contracts.push(contractERC1167Factory, contractERC1820Registry, ...contractsImplementation)
    })

    const contractsFetch = contracts.map((n) => call(fetchContractSaga, ContractCRUD.actions.fetch(n)));
    yield* all(contractsFetch)

    //TODO: Other init sagas
    //Block subscriptions
}
