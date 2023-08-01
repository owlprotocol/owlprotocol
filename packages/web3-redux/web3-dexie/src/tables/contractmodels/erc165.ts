import type { ERC165Id, ERC165, ERC165Name } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { ERC165Id, ERC165 } from "@owlprotocol/web3-models";

export type ERC165KeyId = [networkId: string, address: string, interfaceId: string];
export type ERC165KeyIdEq = ERC165Id;

const ERC165ById = createDexieIndexDefSingle(["networkId", "address", "interfaceId"] as [
    "networkId",
    "address",
    "interfaceId",
]);
const ERC165ByNetworkId = createDexieIndexDefSingle("networkId");
const ERC165ByAddress = createDexieIndexDefSingle(["networkId", "address"] as ["networkId", "address"]);
const ERC165ByNetworkIdInterfaceId = createDexieIndexDefSingle(["networkId", "interfaceId"] as [
    "networkId",
    "interfaceId",
]);
const ERC165ByInterfaceId = createDexieIndexDefSingle("interfaceId");

export const ERC165Idx = [
    ERC165ById,
    ERC165ByNetworkId,
    ERC165ByAddress,
    ERC165ByNetworkIdInterfaceId,
    ERC165ByInterfaceId,
].join(",") as Concat<
    [
        typeof ERC165ById,
        typeof ERC165ByNetworkId,
        typeof ERC165ByAddress,
        typeof ERC165ByNetworkIdInterfaceId,
        typeof ERC165ByInterfaceId,
    ]
>;
export type ERC165KeyIdx = {
    [ERC165ById]: ERC165KeyId;
    [ERC165ByNetworkId]: string;
    [ERC165ByAddress]: [networkId: string, address: string];
    [ERC165ByNetworkIdInterfaceId]: [networkId: string, interfaceId: string];
    [ERC165ByInterfaceId]: string;
};

export type ERC165KeyIdxEq =
    | ERC165Id
    | { networkId: string }
    | { networkId: string; address: string }
    | { networkId: string; interfaceId: string }
    | { interfaceId: string };

export type ERC165KeyIdxEqAny =
    | { networkId: string[] | string; address: string[] | string; interfaceId: string[] | string }
    | { networkId: string[] | string }
    | { networkId: string[] | string; address: string[] | string }
    | { networkId: string[] | string; interfaceId: string[] | string }
    | { interfaceId: string[] | string };

export type ERC165Table = CRUDTable<
    typeof ERC165Name,
    ERC165,
    ERC165KeyId,
    ERC165KeyIdEq,
    ERC165KeyIdx,
    ERC165KeyIdxEq
>;
