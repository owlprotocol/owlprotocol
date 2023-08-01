import type { ERC1155BalanceId, ERC1155Balance, ERC1155BalanceName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { ERC1155BalanceId, ERC1155Balance } from "@owlprotocol/web3-models";

export type ERC1155BalanceKeyId = [networkId: string, address: string, id: string, account: string];
export type ERC1155BalanceKeyIdEq = ERC1155BalanceId;

const ERC1155BalanceById = createDexieIndexDefSingle(["networkId", "address", "id", "account"] as [
    "networkId",
    "address",
    "id",
    "account",
]);
const ERC1155BalanceByNetworkId = createDexieIndexDefSingle("networkId");
const ERC1155BalanceByAddressId = createDexieIndexDefSingle(["networkId", "address", "id"] as [
    "networkId",
    "address",
    "id",
]);
const ERC1155BalanceByAddress = createDexieIndexDefSingle(["networkId", "address"] as ["networkId", "address"]);
const ERC1155BalanceByNetworkIdAccount = createDexieIndexDefSingle(["networkId", "account"] as [
    "networkId",
    "account",
]);
const ERC1155BalanceByAccount = createDexieIndexDefSingle("account");
export const ERC1155BalanceIdx = [
    ERC1155BalanceById,
    ERC1155BalanceByNetworkId,
    ERC1155BalanceByAddressId,
    ERC1155BalanceByAddress,
    ERC1155BalanceByNetworkIdAccount,
    ERC1155BalanceByAccount,
].join(",") as Concat<
    [
        typeof ERC1155BalanceById,
        typeof ERC1155BalanceByNetworkId,
        typeof ERC1155BalanceByAddressId,
        typeof ERC1155BalanceByAddress,
        typeof ERC1155BalanceByNetworkIdAccount,
        typeof ERC1155BalanceByAccount,
    ]
>;
export type ERC1155BalanceKeyIdx = {
    [ERC1155BalanceById]: ERC1155BalanceKeyId;
    [ERC1155BalanceByNetworkId]: string;
    [ERC1155BalanceByAddressId]: [networkId: string, address: string, id: string];
    [ERC1155BalanceByAddress]: [networkId: string, address: string];
    [ERC1155BalanceByNetworkIdAccount]: [networkId: string, account: string];
    [ERC1155BalanceByAccount]: [account: string];
};

export type ERC1155BalanceKeyIdxEq =
    | ERC1155BalanceId
    | { networkId: string }
    | { networkId: string; address: string; id: string }
    | { networkId: string; address: string }
    | { networkId: string; account: string }
    | { account: string };

export type ERC1155BalanceKeyIdxEqAny =
    | { networkId: string[] | string; address: string[] | string; id: string[] | string; account: string[] | string }
    | { networkId: string[] | string }
    | { networkId: string[] | string; address: string[] | string; id: string[] | string }
    | { networkId: string[] | string; address: string[] | string }
    | { networkId: string[] | string; account: string[] | string }
    | { account: string[] | string };

export type ERC1155BalanceTable = CRUDTable<
    typeof ERC1155BalanceName,
    ERC1155Balance,
    ERC1155BalanceKeyId,
    ERC1155BalanceKeyIdEq,
    ERC1155BalanceKeyIdx,
    ERC1155BalanceKeyIdxEq
>;
