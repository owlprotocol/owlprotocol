import { call, put } from 'typed-redux-saga';
import { _4ByteCRUD } from '../crud.js';
import { _4ByteSignature } from '../model/interface.js';
import { fetchSaga as fetchConfig } from '../../config/sagas/fetch.js';
import { AxiosResponse } from 'axios';
import ConfigCRUD from '../../config/crud.js';

interface _4ByteEventResponseItem {
    id: number;
    created_at: string;
    text_signature: string;
    hex_signature: string;
    bytes_signature: string;
}

export function* fetchSaga(action: ReturnType<typeof _4ByteCRUD.actions.fetch>): Generator<
    any,
    {
        signature: _4ByteSignature;
    }
> {
    const { payload } = action;
    const { signatureType, signatureHash, maxCacheAge } = payload;

    const dbSelected = yield* call(_4ByteCRUD.db.get, { signatureType, signatureHash });
    if (dbSelected?.updatedAt && Date.now() - dbSelected.updatedAt <= maxCacheAge) {
        return { signature: dbSelected }
    }
    //Fetch
    const { config } = yield* call(fetchConfig, ConfigCRUD.actions.fetch({ id: '0' }));
    const client = config?._4byteClient;
    if (!client) throw new Error('4byte client undefined!');

    if (signatureType === 'Event') {
        const eventSigRes = yield* call(client.get, `/event-signatures/?hex_signature=${signatureHash}`);
        const eventSig: string | undefined = (eventSigRes as AxiosResponse).data?.results[0]?.text_signature;

        if (eventSig === undefined) throw new Error('This event signature was not found in the 4Byte database');
        const signature = { signatureHash, signatureType: 'Event' as const, preImage: eventSig }
        yield* put(_4ByteCRUD.actions.upsert(signature));
        return { signature }
    } else if (signatureType === 'Function') {
        const functionSigRes = yield* call(client.get, `/signatures/?hex_signature=${signatureHash}`);
        const functionSigResArr: _4ByteEventResponseItem[] | undefined = (functionSigRes as AxiosResponse).data?.results;

        if (functionSigResArr === undefined)
            throw new Error('This function signature was not found in the 4Byte database');

        //get functionSig with lowest id
        const functionSig: string | undefined = functionSigResArr?.reduce((prev, curr) =>
            prev.id < curr.id ? prev : curr,
        ).text_signature;

        const signature = { signatureHash, signatureType: 'Function' as const, preImage: functionSig }
        yield* put(_4ByteCRUD.actions.upsert(signature));
        return { signature }
    }

    throw new Error(`Invalid signatureType ${signatureType}`)
}
