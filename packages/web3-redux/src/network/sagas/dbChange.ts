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
