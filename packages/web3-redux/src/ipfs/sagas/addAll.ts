import { call, put, select } from 'typed-redux-saga';
import { CID } from 'multiformats';
import { AddAllAction, ADD_ALL } from '../actions/index.js';
import asyncGeneratorToArray from '../../utils/asyncGeneratorToArray.js';
import { IPFSDataType } from '../model/interface.js';
import ConfigCRUD from '../../config/crud.js';
import IPFSCacheCRUD from '../crud.js';

const ADD_ALL_ERROR = `${ADD_ALL}/ERROR`;
/** @category Sagas */
export function* addAll(action: AddAllAction) {
    const { payload } = action;
    const { files, options } = payload;

    const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, { id: '0' });
    const { ipfsClient: ipfs } = config ?? {};
    if (!ipfs) throw new Error('ipfClient undefined');

    const iter = yield* call([ipfs, ipfs.addAll], files, options);
    const entries = (yield* call(asyncGeneratorToArray, iter)) as { cid: CID; size: number; path: string }[];

    //Redux Cache
    for (let i = 0; i < entries.length; i++) {
        //@ts-expect-error
        const file = files[i];
        const { cid } = entries[i];
        yield* put(
            IPFSCacheCRUD.actions.upsert({ contentId: cid.toString(), data: file, type: IPFSDataType.File }),
        );
    }
}

export default addAll;
