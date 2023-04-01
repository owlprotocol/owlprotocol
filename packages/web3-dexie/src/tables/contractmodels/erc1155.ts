import type { ERC1155Id, ERC1155, ERC1155Name } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { ERC1155Id, ERC1155 } from "@owlprotocol/web3-models";

export type ERC1155KeyId = [networkId: string, address: string, id: string];
export type ERC1155KeyIdEq = ERC1155Id;

const ERC1155ById = createDexieIndexDefSingle(["networkId", "address", "id"] as ["networkId", "address", "id"]);
const ERC1155ByNetworkId = createDexieIndexDefSingle("networkId");
const ERC1155ByAddress = createDexieIndexDefSingle(["networkId", "address"] as ["networkId", "address"]);
const ERC1155ByUri = createDexieIndexDefSingle("uri");
export const ERC1155Idx = [ERC1155ById, ERC1155ByNetworkId, ERC1155ByAddress, ERC1155ByUri].join(",") as Concat<
    [typeof ERC1155ById, typeof ERC1155ByNetworkId, typeof ERC1155ByAddress, typeof ERC1155ByUri]
>;
export type ERC1155KeyIdx = {
    [ERC1155ById]: ERC1155KeyId;
    [ERC1155ByNetworkId]: string;
    [ERC1155ByAddress]: [networkId: string, address: string];
    [ERC1155ByUri]: string;
};

export type ERC1155KeyIdxEq =
    | ERC1155Id
    | { networkId: string }
    | { networkId: string; address: string; id: string }
    | { networkId: string; address: string }
    | { uri: string };

export type ERC1155KeyIdxEqAny =
    | { networkId: string[] | string }
    | { networkId: string[] | string; address: string[] | string; id: string[] | string }
    | { networkId: string[] | string; address: string[] | string }
    | { uri: string[] | string };

export type ERC1155Table = CRUDTable<
    typeof ERC1155Name,
    ERC1155,
    ERC1155KeyId,
    ERC1155KeyIdEq,
    ERC1155KeyIdx,
    ERC1155KeyIdxEq
>;
