import { call, put, select } from "typed-redux-saga";
import { importer } from "ipfs-unixfs-importer";
import { CID } from "multiformats";
import { UnixFS } from "ipfs-unixfs-exporter";
import { asyncGeneratorToArray } from "@owlprotocol/utils";
import type { CatAction } from "@owlprotocol/web3-actions";
import { IPFSCache, IPFSDataType } from "@owlprotocol/web3-models";
import { IPFSCacheCRUDActions } from "@owlprotocol/web3-actions";
import { IPFSCacheDexie, Web3Dexie } from "@owlprotocol/web3-dexie";
import { ConfigSelectors } from "@owlprotocol/web3-redux-orm";
import { blockstore } from "./blockstore.js";

/** @category Sagas */
export function* cat(action: CatAction) {
    const { payload } = action;
    const { path, options } = payload;
    //If CID convert to string
    const pathStr = typeof path === "string" ? path : path.toString();

    const config = yield* select(ConfigSelectors.selectByIdSingle, {
        id: "0",
    });
    const { ipfsClient: ipfs } = config ?? {};
    if (!ipfs) throw new Error("ipfClient undefined");

    let content: IPFSCache | undefined;
    if (typeof path === "string") {
        const fn = async () => {
            return Web3Dexie.IPFSCache.where("*paths").equals(path).first();
        };
        content = yield* call(fn);
    } else {
        content = yield* call(IPFSCacheDexie.get, { contentId: path.toString() });
    }

    if (!content?.data) {
        const iter = ipfs.cat(path, options);
        //@ts-expect-error
        const iterImports = importer({ content: iter }, blockstore);
        const entries = (yield* call(asyncGeneratorToArray, iterImports)) as {
            cid: CID;
            path: string | undefined;
            unixfs: UnixFS | undefined;
            size: number;
        }[];

        //Redux Cache
        for (let i = 0; i < entries.length; i++) {
            const { cid, unixfs } = entries[i];

            if (unixfs?.data) {
                yield* put(
                    IPFSCacheCRUDActions.actions.upsert({
                        contentId: cid.toString(),
                        data: unixfs.data,
                        type: IPFSDataType.File,
                        paths: [pathStr],
                    }),
                );
            }
        }
    }
}
