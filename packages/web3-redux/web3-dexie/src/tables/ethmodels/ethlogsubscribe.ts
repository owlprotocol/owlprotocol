import type { EthLogSubscribeId, EthLogSubscribe, EthLogSubscribeName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { EthLogSubscribeId, EthLogSubscribe } from "@owlprotocol/web3-models";

export type EthLogSubscribeKeyId = [
    networkId: string,
    address: string,
    topic0: string,
    topic1: string,
    topic2: string,
    topic3: string,
];
export type EthLogSubscribeKeyIdEq = EthLogSubscribeId;

const EthLogSubscribeById = createDexieIndexDefSingle([
    "networkId",
    "address",
    "topic0",
    "topic1",
    "topic2",
    "topic3",
] as ["networkId", "address", "topic0", "topic1", "topic2", "topic3"]);
export const EthLogSubscribeIdx = [EthLogSubscribeById].join(",") as Concat<[typeof EthLogSubscribeById]>;
export type EthLogSubscribeKeyIdx = {
    [EthLogSubscribeById]: [
        networkId: string,
        address: string,
        topic0: string,
        topic1: string,
        topic2: string,
        topic3: string,
    ];
};

export type EthLogSubscribeKeyIdxEq =
    | EthLogSubscribeId
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
      };
export type EthLogSubscribeKeyIdxEqAny = EthLogSubscribeKeyIdxEq;

export type EthLogSubscribeTable = CRUDTable<
    typeof EthLogSubscribeName,
    EthLogSubscribe,
    EthLogSubscribeKeyId,
    EthLogSubscribeKeyIdEq,
    EthLogSubscribeKeyIdx,
    EthLogSubscribeKeyIdxEq
>;
