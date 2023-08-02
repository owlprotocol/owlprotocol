import type { EthLogIndexByContractInput, EthLogId, EthLog, EthLogName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { EthLogId, EthLog } from "@owlprotocol/web3-models";

export type EthLogKeyId = [networkId: string, blockNumber: number, logIndex: number];
export type EthLogKeyIdEq = EthLogId;

const EthLogById = createDexieIndexDefSingle(["networkId", "blockNumber", "logIndex"] as [
    "networkId",
    "blockNumber",
    "logIndex",
]);
const EthLogByBlockNo = createDexieIndexDefSingle(["networkId", "blockNumber"] as ["networkId", "blockNumber"]);
const EthLogByAddressEventFormatFull = createDexieIndexDefSingle(["networkId", "address", "eventFormatFull"] as [
    "networkId",
    "address",
    "eventFormatFull",
]);
const EthLogByAddressEventFormatFullTopic1 = createDexieIndexDefSingle([
    "networkId",
    "address",
    "eventFormatFull",
    "topic1",
] as ["networkId", "address", "eventFormatFull", "topic1"]);
const EthLogByAddressEventFormatFullTopic2 = createDexieIndexDefSingle([
    "networkId",
    "address",
    "eventFormatFull",
    "topic2",
] as ["networkId", "address", "eventFormatFull", "topic2"]);
const EthLogByAddressEventFormatFullTopic3 = createDexieIndexDefSingle([
    "networkId",
    "address",
    "eventFormatFull",
    "topic3",
] as ["networkId", "address", "eventFormatFull", "topic3"]);
const EthLogByEventFormatFull = createDexieIndexDefSingle("eventFormatFull");
const EthLogByEventFormatFullTopic1 = createDexieIndexDefSingle(["eventFormatFull", "topic1"] as [
    "eventFormatFull",
    "topic1",
]);
const EthLogByEventFormatFullTopic2 = createDexieIndexDefSingle(["eventFormatFull", "topic2"] as [
    "eventFormatFull",
    "topic2",
]);
const EthLogByEventFormatFullTopic3 = createDexieIndexDefSingle(["eventFormatFull", "topic3"] as [
    "eventFormatFull",
    "topic3",
]);

export const EthLogIdx = [
    EthLogById,
    EthLogByBlockNo,
    EthLogByAddressEventFormatFull,
    EthLogByAddressEventFormatFullTopic1,
    EthLogByAddressEventFormatFullTopic2,
    EthLogByAddressEventFormatFullTopic3,
    EthLogByEventFormatFull,
    EthLogByEventFormatFullTopic1,
    EthLogByEventFormatFullTopic2,
    EthLogByEventFormatFullTopic3,
].join(",") as Concat<
    [
        typeof EthLogById,
        typeof EthLogByBlockNo,
        typeof EthLogByAddressEventFormatFull,
        typeof EthLogByAddressEventFormatFullTopic1,
        typeof EthLogByAddressEventFormatFullTopic2,
        typeof EthLogByAddressEventFormatFullTopic3,
        typeof EthLogByEventFormatFull,
        typeof EthLogByEventFormatFullTopic1,
        typeof EthLogByEventFormatFullTopic2,
        typeof EthLogByEventFormatFullTopic3,
    ]
>;
export type EthLogKeyIdx = {
    [EthLogById]: EthLogKeyId;
    [EthLogByBlockNo]: [networkId: string, blockNumber: number];
    [EthLogByAddressEventFormatFull]: [networkId: string, address: string, eventFormatFull: string];
    [EthLogByAddressEventFormatFullTopic1]: [
        networkId: string,
        address: string,
        eventFormatFull: string,
        topic1: string,
    ];
    [EthLogByAddressEventFormatFullTopic2]: [
        networkId: string,
        address: string,
        eventFormatFull: string,
        topic2: string,
    ];
    [EthLogByAddressEventFormatFullTopic3]: [
        networkId: string,
        address: string,
        eventFormatFull: string,
        topic3: string,
    ];
    [EthLogByEventFormatFull]: string;
    [EthLogByEventFormatFullTopic1]: [eventFormatFull: string, topic1: string];
    [EthLogByEventFormatFullTopic2]: [eventFormatFull: string, topic2: string];
    [EthLogByEventFormatFullTopic3]: [eventFormatFull: string, topic3: string];
};

export type EthLogKeyIdxEq =
    | EthLogId
    | EthLogIndexByContractInput
    | { networkId: string; blockNumber: number }
    | { eventFormatFull: string; topic1?: string; topic2?: string; topic3?: string };

export type EthLogIndexByContractInputAnyOf =
    | { networkId: string[] | string; address: string[] | string; eventFormatFull: string[] | string } & {
          topic1?: string[] | string;
          topic2?: string[] | string;
          topic3?: string[] | string;
      };

export type EthLogKeyIdxEqAny =
    | { networkId: string[] | string; blockNumber: number[] | number; logIndex: string[] | string }
    | EthLogIndexByContractInputAnyOf
    | { networkId: string[] | string; blockNumber: number[] | number }
    | {
          eventFormatFull: string[] | string;
          topic1?: string[] | string;
          topic2?: string[] | string;
          topic3?: string[] | string;
      };

export type EthLogTable = CRUDTable<
    typeof EthLogName,
    EthLog,
    EthLogKeyId,
    EthLogKeyIdEq,
    EthLogKeyIdx,
    EthLogKeyIdxEq
>;
