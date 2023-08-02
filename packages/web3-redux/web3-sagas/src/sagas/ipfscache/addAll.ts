import { call, put, select } from "typed-redux-saga";
import { CID } from "multiformats";
import { asyncGeneratorToArray } from "@owlprotocol/utils";
import { AddAllAction } from "@owlprotocol/web3-actions";
import { IPFSDataType } from "@owlprotocol/web3-models";
import { IPFSCacheCRUDActions } from "@owlprotocol/web3-actions";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";

/** @category Sagas */
export function* addAll(action: AddAllAction) {
    const { payload } = action;
    const { files, options } = payload;

    const config = yield* select(ConfigSelectors.selectByIdSingle, {
        id: "0",
    });
    const { ipfsClient: ipfs } = config ?? {};
    if (!ipfs) throw new Error("ipfClient undefined");

    const iter = yield* call([ipfs, ipfs.addAll], files, options);
    const entries = (yield* call(asyncGeneratorToArray, iter)) as {
        cid: CID;
        size: number;
        path: string;
    }[];

    //Redux Cache
    for (let i = 0; i < entries.length; i++) {
        //@ts-expect-error
        const file = files[i];
        const { cid } = entries[i];
        yield* put(
            IPFSCacheCRUDActions.actions.upsert({
                contentId: cid.toString(),
                data: file,
                type: IPFSDataType.File,
            }),
        );
    }
}
