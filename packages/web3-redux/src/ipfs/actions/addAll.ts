import type { IPFS } from "ipfs-core-types";
import { createAction2 } from "@owlprotocol/crud-redux";
import { IPFSCacheName } from "../common.js";

export interface AddAllPayload {
    files: Parameters<IPFS["addAll"]>[0];
    options?: Parameters<IPFS["addAll"]>[1];
}

/** @internal */
export const ADD_ALL = `${IPFSCacheName}/ADD_ALL`;
/** @category Actions */
export const addAll = createAction2(ADD_ALL, (payload: AddAllPayload) => {
    return payload;
});
/** @internal */
export type AddAllAction = ReturnType<typeof addAll>;
/** @internal */
export const isAddAllAction = addAll.match;
