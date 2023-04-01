import type { IPFS } from "ipfs-core-types";
import { createAction2 } from "@owlprotocol/crud-redux";

import { IPFSCacheName } from "../common.js";

export interface CatPayload {
    path: Parameters<IPFS["cat"]>[0];
    options?: Parameters<IPFS["cat"]>[1];
}

/** @internal */
export const CAT = `${IPFSCacheName}/CAT`;
/** @category Actions */
export const catAction = createAction2(CAT, (payload: CatPayload) => {
    return {
        ...payload,
        path: typeof payload.path === "string" ? payload.path.replace("ipfs://", "") : payload.path,
    };
});
/** @internal */
export type CatAction = ReturnType<typeof catAction>;
/** @internal */
export const isCatAction = catAction.match;
