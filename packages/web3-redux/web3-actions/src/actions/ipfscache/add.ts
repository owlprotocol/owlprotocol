import type { IPFS } from "ipfs-core-types";
import { createAction2 } from "@owlprotocol/crud-actions";
import { IPFSCacheName } from "@owlprotocol/web3-models";

export interface AddPayload {
    file: Parameters<IPFS["add"]>[0];
    options?: Parameters<IPFS["add"]>[1];
}

/** @internal */
export const ADD = `${IPFSCacheName}/ADD`;
/** @category Actions */
export const add = createAction2(ADD, (payload: AddPayload) => {
    return payload;
});
/** @internal */
export type AddAction = ReturnType<typeof add>;
/** @internal */
export const isAddAction = add.match;
