import { call, put, select } from "typed-redux-saga";
import { AddAction } from "../actions/index.js";
import { IPFSDataType } from "../model/interface.js";
import { IPFSCacheCRUD } from "../crud.js";
import { ConfigCRUD } from "../../config/crud.js";

/** @category Sagas */
export function* add(action: AddAction) {
    const { payload } = action;
    const { file, options } = payload;

    const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, "0");
    const ipfs = config?.ipfsClient;
    if (!ipfs) throw new Error("ipfClient undefined");

    const { cid } = yield* call([ipfs, ipfs.add], file, options);
    yield* put(
        IPFSCacheCRUD.actions.upsert({
            contentId: cid.toString(),
            data: file,
            type: IPFSDataType.File,
        }),
    );
}
