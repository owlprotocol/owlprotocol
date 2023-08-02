import type { ERC20AllowanceId, ERC20Allowance, ERC20AllowanceName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { ERC20AllowanceId, ERC20Allowance } from "@owlprotocol/web3-models";

export type ERC20AllowanceKeyId = [networkId: string, address: string, account: string, spender: string];
export type ERC20AllowanceKeyIdEq = ERC20AllowanceId;

const ERC20AllowanceById = createDexieIndexDefSingle(["networkId", "address", "account", "spender"] as [
    "networkId",
    "address",
    "account",
    "spender",
]);
const ERC20AllowanceByNetworkId = createDexieIndexDefSingle("networkId");
const ERC20AllowanceByAddressAccount = createDexieIndexDefSingle(["networkId", "address", "account"] as [
    "networkId",
    "address",
    "account",
]);
const ERC20AllowanceByNetworkIdAccount = createDexieIndexDefSingle(["networkId", "account"] as [
    "networkId",
    "account",
]);
const ERC20AllowanceByAccount = createDexieIndexDefSingle("account");
export const ERC20AllowanceIdx = [
    ERC20AllowanceById,
    ERC20AllowanceByNetworkId,
    ERC20AllowanceByAddressAccount,
    ERC20AllowanceByNetworkIdAccount,
    ERC20AllowanceByAccount,
].join(",") as Concat<
    [
        typeof ERC20AllowanceById,
        typeof ERC20AllowanceByNetworkId,
        typeof ERC20AllowanceByAddressAccount,
        typeof ERC20AllowanceByNetworkIdAccount,
        typeof ERC20AllowanceByAccount,
    ]
>;
export type ERC20AllowanceKeyIdx = {
    [ERC20AllowanceById]: ERC20AllowanceKeyId;
    [ERC20AllowanceByNetworkId]: string;
    [ERC20AllowanceByAddressAccount]: [networkId: string, address: string, account: string];
    [ERC20AllowanceByNetworkIdAccount]: [networkId: string, account: string];
    [ERC20AllowanceByAccount]: [account: string];
};

export type ERC20AllowanceKeyIdxEq =
    | ERC20AllowanceId
    | { networkId: string }
    | { networkId: string; address: string; account: string }
    | { networkId: string; account: string }
    | { account: string };

export type ERC20AllowanceKeyIdxEqAny =
    | {
          networkId: string[] | string;
          address: string[] | string;
          account: string[] | string;
          spender: string[] | string;
      }
    | { networkId: string[] | string }
    | { networkId: string[] | string; address: string[] | string; account: string[] | string }
    | { networkId: string[] | string; account: string[] | string }
    | { account: string[] | string };

export type ERC20AllowanceTable = CRUDTable<
    typeof ERC20AllowanceName,
    ERC20Allowance,
    ERC20AllowanceKeyId,
    ERC20AllowanceKeyIdEq,
    ERC20AllowanceKeyIdx,
    ERC20AllowanceKeyIdxEq
>;
