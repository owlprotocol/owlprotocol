import * as Contracts from '@owlprotocol/contracts';
import { compact, flatten, keys, map, mapValues, uniq, uniqBy } from "lodash-es";
import { call, put } from 'typed-redux-saga'
import { GetSupportsInterfaceAction, callBatched as callBatchedAction, CallActionInput } from "../actions/index.js";
import { ContractCRUD } from "../crud.js";
import { ContractInterfaceCRUD } from "../../contractinterface/crud.js";
import { fetchSaga } from "./fetch.js";
import { callBatched } from "./callBatched.js";
import { ContractWithObjects } from "../model/interface.js";
import { ContractInterface } from "../../contractinterface/model/interface.js";
import { fetchBatchSaga as fetchContractInterfaceBatchSaga } from "../../contractinterface/sagas/fetchBatch.js"
import { NetworkWithObjects } from "../../network/model/interface.js";

export function* getSupportsInterfaceSaga(action: GetSupportsInterfaceAction): Generator<
    any,
    {
        network: NetworkWithObjects;
        contract: ContractWithObjects;
        contractInterfaces: ContractInterface[]
    }
> {
    const { payload } = action;
    const { networkId, address, interfaceIds } = payload;

    //TODO: Replace with mergeAbi saga
    const { contract } = yield* call(fetchSaga, ContractCRUD.actions.fetch({
        networkId,
        address,
        abi: Contracts.Artifacts.IERC165.abi,
        interfaceIds: [Contracts.IERC165InterfaceId]
    },
        action.meta.uuid
    ));

    /*
    const { contract: registry } = yield* call(fetchSaga, ContractCRUD.actions.fetch({
        networkId,
        address: Utils.ERC1820.registryAddress,
        abi: Contracts.Artifacts.IERC1820Registry.abi
    }))

    //Find supported interfaceIds with IERC165
    const callActionInputs = map(keys(interfaceIds), (interfaceId) => {
        return {
            networkId,
            address: registry.address,
            method: 'implementsERC165Interface',
            args: [address, interfaceId],
            maxCacheAge: Number.MAX_SAFE_INTEGER
        } as CallActionInput
    })
    */
    const callActionInputs = map(keys(interfaceIds), (interfaceId) => {
        return {
            networkId,
            address,
            method: 'supportsInterface',
            args: [interfaceId],
            maxCacheAge: Number.MAX_SAFE_INTEGER
        } as CallActionInput
    })
    const results = yield* call(callBatched, callBatchedAction({ calls: callActionInputs }, action.meta.uuid))
    const supported = results.map((r) => r.ethcall.returnValue as boolean);
    const supportedInterfaceIds = compact(
        map(keys(interfaceIds), (interfaceId, idx) => { return supported[idx] ? interfaceId : undefined })
    )

    //Query local interfaceId => ABI info
    const { contractInterfaces } = yield* call(
        fetchContractInterfaceBatchSaga,
        ContractInterfaceCRUD.actions.fetchBatch(
            supportedInterfaceIds.map((interfaceId) => {
                return {
                    interfaceId,
                    abi: interfaceIds[interfaceId],
                    maxCacheAge: Number.MAX_SAFE_INTEGER
                }
            })
        )
    )

    //Patch contract with new interfaces
    const newAbi = flatten([contract.abi ?? [], ...contractInterfaces.map((c) => c.abi)])
    //Merge Abis
    const newAbiUniq = uniqBy(newAbi, (a) => JSON.stringify({ type: a.type, name: a.name, inputs: a.inputs }))
    const newInterfaceIds = uniq([...(contract.interfaceIds ?? []), ...supportedInterfaceIds])
    yield* put(ContractCRUD.actions.update({
        networkId,
        address,
        abi: newAbiUniq,
        interfaceIds: newInterfaceIds
    }))

    //Get latest contract
    const { network, contract: contract2 } = yield* call(
        fetchSaga,
        ContractCRUD.actions.fetch({ networkId, address },
            action.meta.uuid)
    );

    return { network, contract: contract2, contractInterfaces }
}
