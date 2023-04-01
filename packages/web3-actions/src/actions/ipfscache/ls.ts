import type { IPFS } from "ipfs-core-types";
import { createAction2 } from "@owlprotocol/crud-actions";
import { IPFSCacheName } from "@owlprotocol/web3-models";

export interface LSPayload {
    path: Parameters<IPFS["ls"]>[0];
    options?: Parameters<IPFS["ls"]>[1];
}

/** @internal */
export const LS = `${IPFSCacheName}/LS`;
/** @category Actions */
export const ls = createAction2(LS, (payload: LSPayload) => {
    return payload;
});
/** @internal */
export type LsAction = ReturnType<typeof ls>;
/** @internal */
export const isLsAction = ls.match;
