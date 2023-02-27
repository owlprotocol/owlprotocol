import { Ethers, Utils } from "@owlprotocol/contracts";
import { call, put } from "typed-redux-saga";
import { ContractCRUD } from "../../contract/crud.js";
import { NetworkCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof NetworkCRUD.actions.dbCreating>): Generator<
    any,
    any
> {
    const { payload } = action;
    const { networkId, web3Rpc } = payload.obj

    if (web3Rpc) {
        yield* put(NetworkCRUD.actions.reduxUpsert({ networkId, web3Rpc }))
    }

    const contractsImplementation = Object.entries(Ethers.implementationFactories).map(([k, f]) => {
        return {
            networkId,
            address: f.getAddress(),
            label: `${k}Implementation`,
            tags: ['Implementation']
        }
    })
    yield* put(ContractCRUD.actions.createBatched([{ networkId, address: Utils.ERC1820.registryAddress }, { networkId, address: Utils.ERC1167Factory.ERC1167FactoryAddress }, ...contractsImplementation]))
}

export function* dbUpdatingSaga(action: ReturnType<typeof NetworkCRUD.actions.dbUpdating>): Generator<
    any,
    any
> {
    const { payload } = action;
    const { networkId } = payload.obj
    const { web3Rpc } = payload.mods;

    if (web3Rpc) {
        yield* put(NetworkCRUD.actions.reduxUpsert({ networkId, web3Rpc }))
    }
}

export function* dbDeletingSaga(action: ReturnType<typeof NetworkCRUD.actions.dbDeleting>): Generator<
    any,
    any
> {
    const { payload } = action;
    if (payload.obj) {
        const { networkId } = payload.obj
        yield* put(NetworkCRUD.actions.reduxDelete({ networkId }))
    }
}

export function* hydrateNetworkContracts(networkId: string) {
    const contracts = yield* call(ContractCRUD.db.where, { networkId })
    const contractIds = contracts.map(({ networkId, address }) => {
        return { networkId, address };
    });
    if (contractIds.length > 0) {
        yield* put(ContractCRUD.actions.hydrateBatched(contractIds));
    }
}
