import { call, put, select } from "typed-redux-saga";
import { AddAction } from "@owlprotocol/web3-actions";
import { IPFSDataType } from "@owlprotocol/web3-models";
import { IPFSCacheCRUDActions } from "@owlprotocol/web3-actions";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";

/** @category Sagas */
export function* add(action: AddAction) {
    const { payload } = action;
    const { file, options } = payload;

    const config = yield* select(ConfigSelectors.selectByIdSingle, "0");
    const ipfs = config?.ipfsClient;
    if (!ipfs) throw new Error("ipfClient undefined");

    const { cid } = yield* call([ipfs, ipfs.add], file, options);
    yield* put(
        IPFSCacheCRUDActions.actions.upsert({
            contentId: cid.toString(),
            data: file,
            type: IPFSDataType.File,
        }),
    );
}
