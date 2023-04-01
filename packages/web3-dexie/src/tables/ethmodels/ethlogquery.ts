import type { EthLogQueryId, EthLogQuery, EthLogQueryName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { EthLogQueryId, EthLogQuery } from "@owlprotocol/web3-models";

export type EthLogQueryKeyId = [
    networkId: string,
    address: string,
    topic0: string,
    topic1: string,
    topic2: string,
    topic3: string,
    fromBlock: number,
    toBlock: number,
];
export type EthLogQueryKeyIdEq = EthLogQueryId;

const EthLogQueryById = createDexieIndexDefSingle([
    "networkId",
    "address",
    "topic0",
    "topic1",
    "topic2",
    "topic3",
    "fromBlock",
    "toBlock",
] as ["networkId", "address", "topic0", "topic1", "topic2", "topic3", "fromBlock", "toBlock"]);
export const EthLogQueryIdx = [EthLogQueryById].join(",") as Concat<[typeof EthLogQueryById]>;
export type EthLogQueryKeyIdx = {
    [EthLogQueryById]: [
        networkId: string,
        address: string,
        topic0: string,
        topic1: string,
        topic2: string,
        topic3: string,
        fromBlock: number,
        toBlock: number,
    ];
};
export type EthLogQueryKeyIdxEq =
    | EthLogQueryId
    | { networkId: string }
    | { networkId: string; address: string }
    | { networkId: string; address: string; topic0: string }
    | { networkId: string; address: string; eventFormatFull: string }
    | {
          networkId: string;
          address: string;
          eventFormatFull: string;
          topic1: string;
          topic2: string;
          topic3: string;
          fromBlock: number;
          toBlock: number;
      };
export type EthLogQueryKeyIdxEqAny = EthLogQueryKeyIdxEq;

export type EthLogQueryTable = CRUDTable<
    typeof EthLogQueryName,
    EthLogQuery,
    EthLogQueryKeyId,
    EthLogQueryKeyIdEq,
    EthLogQueryKeyIdx,
    EthLogQueryKeyIdxEq
>;
