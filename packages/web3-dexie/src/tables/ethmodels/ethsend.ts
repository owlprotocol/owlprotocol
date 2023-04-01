/* eslint-disable @typescript-eslint/ban-types */
import type { EthSend, EthSendId, EthSendName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { EthSend, EthSendId } from "@owlprotocol/web3-models";

//Valid indexes
export type EthSendKeyId = [uuid: string];
export type EthSendKeyIdEq = EthSendId;

const EthSendById = createDexieIndexDefSingle(["uuid"] as ["uuid"]);
const EthSendByNetworkIdToMethodFormatFull = createDexieIndexDefSingle(["networkId", "to", "methodFormatFull"] as [
    "networkId",
    "to",
    "methodFormatFull",
]);
const EthSendByNetworkIdToMethodFormatFullArg0Idx = createDexieIndexDefSingle([
    "networkId",
    "to",
    "methodFormatFull",
    "arg0Idx",
] as ["networkId", "to", "methodFormatFull", "arg0Idx"]);
const EthSendByNetworkIdToMethodFormatFullArg1Idx = createDexieIndexDefSingle([
    "networkId",
    "to",
    "methodFormatFull",
    "arg1Idx",
] as ["networkId", "to", "methodFormatFull", "arg1Idx"]);
const EthSendByNetworkIdToMethodFormatFullArg2Idx = createDexieIndexDefSingle([
    "networkId",
    "to",
    "methodFormatFull",
    "arg2Idx",
] as ["networkId", "to", "methodFormatFull", "arg2Idx"]);
const EthSendByNetworkIdMethodFormatFull = createDexieIndexDefSingle(["networkId", "methodFormatFull"] as [
    "networkId",
    "methodFormatFull",
]);
const EthSendByNetworkIdMethodFormatFullArg0Idx = createDexieIndexDefSingle([
    "networkId",
    "methodFormatFull",
    "arg0Idx",
] as ["networkId", "methodFormatFull", "arg0Idx"]);
const EthSendByNetworkIdMethodFormatFullArg1Idx = createDexieIndexDefSingle([
    "networkId",
    "methodFormatFull",
    "arg1Idx",
] as ["networkId", "methodFormatFull", "arg1Idx"]);
const EthSendByNetworkIdMethodFormatFullArg2Idx = createDexieIndexDefSingle([
    "networkId",
    "methodFormatFull",
    "arg2Idx",
] as ["networkId", "methodFormatFull", "arg2Idx"]);
export const EthSendIdx = [
    EthSendById,
    EthSendByNetworkIdToMethodFormatFull,
    EthSendByNetworkIdToMethodFormatFullArg0Idx,
    EthSendByNetworkIdToMethodFormatFullArg1Idx,
    EthSendByNetworkIdToMethodFormatFullArg2Idx,
    EthSendByNetworkIdMethodFormatFull,
    EthSendByNetworkIdMethodFormatFullArg0Idx,
    EthSendByNetworkIdMethodFormatFullArg1Idx,
    EthSendByNetworkIdMethodFormatFullArg2Idx,
].join(",") as Concat<
    [
        typeof EthSendById,
        typeof EthSendByNetworkIdToMethodFormatFull,
        typeof EthSendByNetworkIdToMethodFormatFullArg0Idx,
        typeof EthSendByNetworkIdToMethodFormatFullArg1Idx,
        typeof EthSendByNetworkIdToMethodFormatFullArg2Idx,
        typeof EthSendByNetworkIdMethodFormatFull,
        typeof EthSendByNetworkIdMethodFormatFullArg0Idx,
        typeof EthSendByNetworkIdMethodFormatFullArg1Idx,
        typeof EthSendByNetworkIdMethodFormatFullArg2Idx,
    ]
>;
export type EthSendKeyIdx = {
    [EthSendById]: EthSendKeyId;
    [EthSendByNetworkIdToMethodFormatFull]: [networkId: string, to: string, methodFormatFull: string];
    [EthSendByNetworkIdToMethodFormatFullArg0Idx]: [
        networkId: string,
        to: string,
        methodFormatFull: string,
        arg0Idx: string,
    ];
    [EthSendByNetworkIdToMethodFormatFullArg1Idx]: [
        networkId: string,
        to: string,
        methodFormatFull: string,
        arg1Idx: string,
    ];
    [EthSendByNetworkIdToMethodFormatFullArg2Idx]: [
        networkId: string,
        to: string,
        methodFormatFull: string,
        arg2Idx: string,
    ];
    [EthSendByNetworkIdMethodFormatFull]: [networkId: string, methodFormatFull: string];
    [EthSendByNetworkIdMethodFormatFullArg0Idx]: [networkId: string, methodFormatFull: string, arg0Idx: string];
    [EthSendByNetworkIdMethodFormatFullArg1Idx]: [networkId: string, methodFormatFull: string, arg1Idx: string];
    [EthSendByNetworkIdMethodFormatFullArg2Idx]: [networkId: string, methodFormatFull: string, arg2Idx: string];
};
export type EthSendKeyIdxEq =
    | EthSendId
    | ({ networkId: string } & ({ to: string } | {}) & { methodFormatFull: string } & (
              | { arg0Idx: string }
              | { arg1Idx: string }
              | { arg2Idx: string }
              | {}
          ));

export type EthSendKeyIdxEqAny =
    | { networkId: string[] | string; to: string[] | string; data: string }
    | ({ networkId: string[] | string } & ({ to: string[] | string } | {}) & { methodFormatFull: string[] | string } & (
              | { arg0Idx: string[] | string }
              | { arg1Idx: string[] | string }
              | { arg2Idx: string[] | string }
              | {}
          ));

export type EthSendTable = CRUDTable<
    typeof EthSendName,
    EthSend,
    EthSendKeyId,
    EthSendKeyIdEq,
    EthSendKeyIdx,
    EthSendKeyIdxEq
>;
