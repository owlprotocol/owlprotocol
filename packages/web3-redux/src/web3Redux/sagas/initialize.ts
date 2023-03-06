import { put, call, all } from 'typed-redux-saga';
import { interfaceIdNames, InterfaceName } from '@owlprotocol/contracts';
import { ContractCRUD } from '../../contract/crud.js';
import { fetchContractData } from '../../contract/sagas/dbChange.js';
import { fetchSaga as fetchConfigSaga } from '../../config/sagas/fetch.js'
import { NetworkCRUD } from "../../network/crud.js";
import { defaultNetworks } from '../../network/defaults.js'
import { Network } from "../../network/model/interface.js";
import { InitializeAction } from "../actions/index.js";
import { ConfigCRUD } from '../../config/crud.js';
import { getCodeAction } from '../../contract/actions/getCode.js';
import { inferInterfaceAction } from '../../contract/actions/index.js';

export function* initializeSaga(action: InitializeAction): Generator<any, any, any> {
    //Load existing data to redux
    //Config
    const { config } = yield* call(fetchConfigSaga, ConfigCRUD.actions.fetch({ id: '0' }))
    const account = config?.account

    //Networks
    const networks = yield* call(NetworkCRUD.db.all)
    yield* put(NetworkCRUD.actions.reduxUpsertBatched(networks))
    //Contracts
    const contracts = yield* call(ContractCRUD.db.all)
    const contractsWithAbi = contracts.filter((c) => c.abi)
    const contractsNoAbi = contracts.filter((c) => !c.abi)
    yield* put(ContractCRUD.actions.reduxUpsertBatched(contractsWithAbi))
    yield* all(contractsWithAbi.map((c) => {
        const interfaceIds = c.interfaceIds ?? []
        const interfaceNamesSet = new Set(interfaceIds.map((interfaceId) => interfaceIdNames[interfaceId])) as Set<InterfaceName>
        return call(fetchContractData, c.networkId, c.address, account, interfaceNamesSet)
    }))
    yield* all(contractsNoAbi.map((c) => {
        //Infer
        const { networkId, address } = c;
        return put(inferInterfaceAction({ networkId, address }))
    }))

    //Eth Call
    /*
    const ethcall = yield* call(EthCallCRUD.db.all)
    const ethcallLoading = ethcall.filter((f) => f.status === 'LOADING')
    */
    //Block subscriptions
    //TODO


    //Create default networks
    const networksCreate = Object.values(defaultNetworks()) as Network[]
    yield* put(NetworkCRUD.actions.createBatched(networksCreate))
}
