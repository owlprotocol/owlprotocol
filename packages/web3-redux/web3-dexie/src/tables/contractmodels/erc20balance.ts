import type { ERC20BalanceId, ERC20Balance, ERC20BalanceName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { ERC20BalanceId, ERC20Balance } from "@owlprotocol/web3-models";

export type ERC20BalanceKeyId = [networkId: string, address: string, account: string];
export type ERC20BalanceKeyIdEq = ERC20BalanceId;

const ERC20BalanceById = createDexieIndexDefSingle(["networkId", "address", "account"] as [
    "networkId",
    "address",
    "account",
]);
const ERC20BalanceByNetworkId = createDexieIndexDefSingle("networkId");
const ERC20BalanceByNetworkIdAccount = createDexieIndexDefSingle(["networkId", "account"] as ["networkId", "account"]);
const ERC20BalanceByAccount = createDexieIndexDefSingle("account");
export const ERC20BalanceIdx = [
    ERC20BalanceById,
    ERC20BalanceByNetworkId,
    ERC20BalanceByNetworkIdAccount,
    ERC20BalanceByAccount,
].join(",") as Concat<
    [
        typeof ERC20BalanceById,
        typeof ERC20BalanceByNetworkId,
        typeof ERC20BalanceByNetworkIdAccount,
        typeof ERC20BalanceByAccount,
    ]
>;
export type ERC20BalanceKeyIdx = {
    [ERC20BalanceById]: ERC20BalanceKeyId;
    [ERC20BalanceByNetworkId]: string;
    [ERC20BalanceByNetworkIdAccount]: [networkId: string, account: string];
    [ERC20BalanceByAccount]: [account: string];
};

export type ERC20BalanceKeyIdxEq =
    | ERC20BalanceId
    | { networkId: string }
    | { networkId: string; account: string }
    | { account: string };

export type ERC20BalanceKeyIdxEqAny =
    | { networkId: string[] | string; address: string[] | string; account: string[] | string }
    | { networkId: string[] | string }
    | { networkId: string[] | string; account: string[] | string }
    | { account: string[] | string };

export type ERC20BalanceTable = CRUDTable<
    typeof ERC20BalanceName,
    ERC20Balance,
    ERC20BalanceKeyId,
    ERC20BalanceKeyIdEq,
    ERC20BalanceKeyIdx,
    ERC20BalanceKeyIdxEq
>;
