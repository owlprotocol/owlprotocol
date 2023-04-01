import { Ethers, Utils } from "@owlprotocol/contracts";
import { call, put } from "typed-redux-saga";
import {
    subscribeAction as blockSubscribeAction,
    unsubscribeAction as blockUnsubscribeAction,
} from "../../ethmodels/ethblock/actions/index.js";
import { ContractCRUD } from "../../contract/crud.js";
import { NetworkCRUD } from "../crud.js";

//Handle contract creation
export function* dbCreatingSaga(action: ReturnType<typeof NetworkCRUD.actions.dbCreating>): Generator<any, any> {
    const { payload } = action;
    const { networkId, web3Rpc, syncContracts, syncBlocks } = payload.obj;

    if (web3Rpc) {
        yield* put(NetworkCRUD.actions.reduxUpsert({ networkId, web3Rpc }));
    }

    //Skip test cases
    if (syncContracts) {
        yield* call(syncNetworkContracts, networkId);
    }

    if (syncBlocks) {
        yield put(blockSubscribeAction(networkId));
    }
}

export function* dbUpdatingSaga(action: ReturnType<typeof NetworkCRUD.actions.dbUpdating>): Generator<any, any> {
    const { payload } = action;
    const { networkId } = payload.obj;
    const { web3Rpc, syncContracts, syncBlocks } = payload.mods;

    if (web3Rpc) {
        yield* put(NetworkCRUD.actions.reduxUpsert({ networkId, web3Rpc }));
    }

    if (syncContracts) {
        yield* call(syncNetworkContracts, networkId);
    }

    if (syncBlocks) {
        yield put(blockSubscribeAction(networkId));
    } else if (syncBlocks === false) {
        yield put(blockUnsubscribeAction(networkId));
    }
}

export function* dbDeletingSaga(action: ReturnType<typeof NetworkCRUD.actions.dbDeleting>): Generator<any, any> {
    const { payload } = action;
    if (payload.obj) {
        const { networkId, syncBlocks } = payload.obj;
        yield* put(NetworkCRUD.actions.reduxDelete({ networkId }));

        if (syncBlocks) {
            yield put(blockUnsubscribeAction(networkId));
        }
    }
}

export function* syncNetworkContracts(networkId: string) {
    //Interface is marked as checked
    const contractsImplementation = Object.entries(Ethers.implementationFactories).map(([k, f]) => {
        return {
            networkId,
            address: f.getAddress(),
            label: `${k}Implementation`,
            tags: ["Implementation"],
            //interfaceCheckedAt: Number.MAX_SAFE_INTEGER,
        };
    });
    yield* put(
        ContractCRUD.actions.createBatched([
            {
                networkId,
                address: Utils.ERC1820.registryAddress,
                //interfaceCheckedAt: Number.MAX_SAFE_INTEGER
            },
            {
                networkId,
                address: Utils.ERC1167Factory.ERC1167FactoryAddress,
                //interfaceCheckedAt: Number.MAX_SAFE_INTEGER,
            },
            ...contractsImplementation,
        ]),
    );
}

export function* validateWithReduxNetworkContracts(networkId: string) {
    const contracts = yield* call(ContractCRUD.db.where, { networkId });
    const contractIds = contracts.map(({ networkId, address }) => {
        return { networkId, address };
    });
    if (contractIds.length > 0) {
        //TODO: Hydrate Contracts
    }
}
