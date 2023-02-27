import { put } from 'typed-redux-saga';
import { NetworkCRUD } from "../../network/crud.js";
import { defaultNetworks } from '../../network/defaults.js'
import { Network } from "../../network/model/interface.js";
import { InitializeAction } from "../actions/index.js";

export function* initializeSaga(action: InitializeAction): Generator<any, any, any> {
    /**
     *  dispatch(Network.actions.create({ networkId: '31337' }))
        dispatch(Network.actions.fetch({ networkId: '31337' })),
        dispatch(Contract.actions)
     */

    //Networks
    const networks = Object.values(defaultNetworks()) as Network[]
    yield* put(NetworkCRUD.actions.createBatched(networks))

    //TODO: Other init sagas
    //Block subscriptions
}
