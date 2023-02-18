import { put as putSaga, call, select } from 'typed-redux-saga';
import { NetworkCRUD } from '../../network/crud.js';
import { NetworkWithObjects } from '../../network/model/interface.js';
import { fetchSaga as fetchNetworkSaga } from '../../network/sagas/fetch.js';
import { ContractCRUD } from '../crud.js';
import { ContractWithObjects } from '../model/interface.js';
import { inferInterface } from './inferInterface.js';

export function* fetchSaga(action: ReturnType<typeof ContractCRUD.actions.fetch>): Generator<
    any,
    {
        network: NetworkWithObjects;
        contract: ContractWithObjects;
    }
> {
    const { payload } = action;
    const { networkId, address } = payload;

    const { network } = yield* call(fetchNetworkSaga, NetworkCRUD.actions.fetch({ networkId }, action.meta.uuid));

    const reduxSelected = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
    if (reduxSelected) return { network, contract: reduxSelected };

    const dbSelected = yield* call(ContractCRUD.db.get, { networkId, address });
    if (!dbSelected) throw Error(`No contract ${networkId} ${address}`);

    if (dbSelected.abi) {
        yield* putSaga(ContractCRUD.actions.reduxUpsert(dbSelected, action.meta.uuid));
        const reduxSelected2 = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
        if (!reduxSelected2) throw Error(`No contract ${networkId} ${address}`);

        return { network, contract: reduxSelected2 };
    } else {
        //const { abi } = yield* call(inferInterface, networkId, address)
        //yield* putSaga(ContractCRUD.actions.reduxUpsert({ networkId, address, abi }, action.meta.uuid));
        //const reduxSelected2 = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
        //if (!reduxSelected2) throw Error(`No contract ${networkId} ${address}`);

        //@ts-expect-error
        return { network, contract: undefined }
    }
}
