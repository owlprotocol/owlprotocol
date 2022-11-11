import { put as putSaga, call, select } from 'typed-redux-saga';
import NetworkCRUD from '../../network/crud.js';
import { NetworkWithObjects } from '../../network/model/interface.js';
import { fetchSaga as fetchNetworkSaga } from '../../network/sagas/fetch.js';
import ContractCRUD from '../crud.js';
import { getSupportsInterface as getSupportsInterfaceAction } from '../actions/index.js'
import { ContractWithObjects } from '../model/interface.js';
import { getSupportsInterfaceSaga } from './getSupportsInterface.js';

export function* fetchSaga(action: ReturnType<typeof ContractCRUD.actions.fetch>): Generator<
    any,
    {
        network: NetworkWithObjects;
        contract: ContractWithObjects;
    }
> {
    const { payload } = action;
    const { networkId, address, abi } = payload;

    const { network } = yield* call(fetchNetworkSaga, NetworkCRUD.actions.fetch({ networkId }, action.meta.uuid));

    const reduxSelected = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
    if (reduxSelected && reduxSelected.web3Contract) {
        return { network, contract: reduxSelected };
    }

    const dbSelected = yield* call(ContractCRUD.db.get, { networkId, address });
    if (dbSelected?.abi) {
        //Hydrate
        yield* putSaga(ContractCRUD.actions.upsert(dbSelected, action.meta.uuid));
        const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
        if (!contract?.web3Contract) throw Error(`No contract ${networkId} ${address}`);
        return { network, contract };
    }

    if (abi) {
        //Default values
        yield* putSaga(ContractCRUD.actions.upsert(payload, action.meta.uuid));
        const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
        if (!contract?.web3Contract) throw Error(`No contract ${networkId} ${address}`);
        return { network, contract };
    }

    //Fetch interface using IERC165, contract at least supports IERC165
    const { contract } = yield* call(getSupportsInterfaceSaga, getSupportsInterfaceAction({ networkId, address }, action.meta.uuid))
    return { network, contract }

}
