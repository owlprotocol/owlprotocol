import type { ERC20Id, ERC20, ERC20Name } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { ERC20Id, ERC20 } from "@owlprotocol/web3-models";

export type ERC20KeyId = [networkId: string, address: string];
export type ERC20KeyIdEq = ERC20Id;

const ERC20ById = createDexieIndexDefSingle(["networkId", "address"] as ["networkId", "address"]);
const ERC20ByNetworkId = createDexieIndexDefSingle("networkId");
export const ERC20Idx = [ERC20ById, ERC20ByNetworkId].join(",") as Concat<[typeof ERC20ById, typeof ERC20ByNetworkId]>;
export type ERC20KeyIdx = {
    [ERC20ById]: ERC20KeyId;
    [ERC20ByNetworkId]: string;
};

export type ERC20KeyIdxEq = ERC20Id | { networkId: string };

export type ERC20KeyIdxEqAny =
    | { networkId: string[] | string; address: string[] | string }
    | { networkId: string[] | string };

export type ERC20Table = CRUDTable<typeof ERC20Name, ERC20, ERC20KeyId, ERC20KeyIdEq, ERC20KeyIdx, ERC20KeyIdxEq>;
