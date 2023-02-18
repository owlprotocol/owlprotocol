import { put as putSaga, call, select } from 'typed-redux-saga';
import { NetworkCRUD } from '../crud.js';
import { NetworkWithObjects } from '../model/interface.js';

export function* fetchSaga(action: ReturnType<typeof NetworkCRUD.actions.fetch>): Generator<
    any,
    {
        network: NetworkWithObjects;
    }
> {
    const { payload } = action;
    const { networkId } = payload;

    const reduxSelected = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
    //console.debug({ reduxSelected })
    if (reduxSelected) return { network: reduxSelected }

    const dbSelected = yield* call(NetworkCRUD.db.get, { networkId });
    if (!dbSelected) throw Error(`No network ${networkId}`);

    yield* putSaga(NetworkCRUD.actions.reduxUpsert(dbSelected, action.meta.uuid));
    const reduxSelected2 = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
    if (!reduxSelected2) throw Error(`No network ${networkId}`);

    return { network: reduxSelected2 }
}
