import type { EthTransactionId, EthTransaction, EthTransactionName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { EthTransactionId, EthTransaction } from "@owlprotocol/web3-models";

export type EthTransactionKeyId = [networkId: string, hash: string];
export type EthTransactionKeyIdEq = EthTransactionId;

const EthTransactionById = createDexieIndexDefSingle(["networkId", "hash"] as ["networkId", "hash"]);
const EthTransactionByNetworkId = createDexieIndexDefSingle(["networkId"] as ["networkId"]);
const EthTransactionByBlockhash = createDexieIndexDefSingle(["networkId", "blockHash"] as ["networkId", "blockHash"]);
const EthTransactionByFromTo = createDexieIndexDefSingle(["networkId", "from", "to"] as ["networkId", "from", "to"]);
const EthTransactionByFrom = createDexieIndexDefSingle(["networkId", "from"] as ["networkId", "from"]);
const EthTransactionByTo = createDexieIndexDefSingle(["networkId", "to"] as ["networkId", "to"]);
export const EthTransactionIdx = [
    EthTransactionById,
    EthTransactionByNetworkId,
    EthTransactionByBlockhash,
    EthTransactionByFromTo,
    EthTransactionByFrom,
    EthTransactionByTo,
].join(",") as Concat<
    [
        typeof EthTransactionById,
        typeof EthTransactionByNetworkId,
        typeof EthTransactionByBlockhash,
        typeof EthTransactionByFromTo,
        typeof EthTransactionByFrom,
        typeof EthTransactionByTo,
    ]
>;
export type EthTransactionKeyIdx = {
    [EthTransactionById]: EthTransactionKeyId;
    [EthTransactionByNetworkId]: [networkId: string];
    [EthTransactionByBlockhash]: [networkId: string, blockHash: string];
    [EthTransactionByFromTo]: [networkId: string, from: string, to: string];
    [EthTransactionByFrom]: [networkId: string, from: string];
    [EthTransactionByTo]: [networkId: string, to: string];
};
export type EthTransactionKeyIdxEq =
    | EthTransactionId
    | { networkId: string }
    | { networkId: string; blockHash: string }
    | { networkId: string; from: string; to: string }
    | { networkId: string; from: string }
    | { networkId: string; to: string }
    | { networkId: string; contractAddress: string };

export type EthTransactionKeyIdxEqAny = EthTransactionKeyIdxEq;

export type EthTransactionTable = CRUDTable<
    typeof EthTransactionName,
    EthTransaction,
    EthTransactionKeyId,
    EthTransactionKeyIdEq,
    EthTransactionKeyIdx,
    EthTransactionKeyIdxEq
>;
