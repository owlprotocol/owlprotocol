import { put as putSaga, call, select } from 'typed-redux-saga';
import { ConfigCRUD } from '../crud.js';
import { ConfigWithObjects } from '../model/interface.js';

export function* fetchSaga(action: ReturnType<typeof ConfigCRUD.actions.fetch>): Generator<
    any,
    {
        config: ConfigWithObjects;
    }
> {
    const { payload } = action;
    const { id, ipfsUrl, ipfsClient, _4byteUrl, _4byteClient } = payload;

    const reduxSelected = yield* select(ConfigCRUD.selectors.selectByIdSingle, id ?? '0');
    if (ipfsUrl && ipfsUrl != reduxSelected?.ipfsUrl
        || ipfsClient && ipfsClient != reduxSelected?.ipfsClient
        || _4byteUrl && _4byteUrl != reduxSelected?._4byteUrl
        || _4byteClient && _4byteClient != reduxSelected?._4byteClient) {
        //Update values
        yield* putSaga(ConfigCRUD.actions.upsert(payload, action.meta.uuid));
        const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, id ?? '0');
        //@ts-expect-error
        return { config: config ?? {} };
    } else if (reduxSelected) {
        //Return current config
        return { config: reduxSelected };
    }


    const dbSelected = yield* call(ConfigCRUD.db.get, id ?? '0');
    if (ipfsUrl && ipfsUrl != dbSelected?.ipfsUrl
        || _4byteUrl && _4byteUrl != dbSelected?._4byteUrl) {
        //Update values
        yield* putSaga(ConfigCRUD.actions.upsert(payload, action.meta.uuid));
        const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, id ?? '0');
        //@ts-expect-error
        return { config: config ?? {} };
    } else {
        //@ts-expect-error
        return { config: dbSelected ?? {} }
    }

}
