import { call, put } from 'typed-redux-saga';
import { AddAction, ADD } from '../actions/index.js';
import { IPFSDataType } from '../model/interface.js';
import { IPFSCacheCRUD } from '../crud.js';
import { fetchSaga as fetchConfig } from '../../config/sagas/fetch.js';
import { fetchSaga } from '../../4byte/sagas/fetch.js';
import { ConfigCRUD } from '../../config/crud.js';

const ADD_ERROR = `${ADD}/ERROR`;
/** @category Sagas */
export function* add(action: AddAction) {
    const { payload } = action;
    const { file, options } = payload;

    const { config } = yield* call(fetchConfig, ConfigCRUD.actions.fetch({ id: '0' }));
    const { ipfsClient: ipfs } = config ?? {};
    if (!ipfs) throw new Error('ipfClient undefined');

    const { cid } = yield* call([ipfs, ipfs.add], file, options);
    yield* put(IPFSCacheCRUD.actions.upsert({ contentId: cid.toString(), data: file, type: IPFSDataType.File }));

}

export default add;
