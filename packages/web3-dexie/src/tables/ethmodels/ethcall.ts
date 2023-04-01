/* eslint-disable @typescript-eslint/ban-types */
import type { EthCall, EthCallId, EthCallName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { EthCall, EthCallId } from "@owlprotocol/web3-models";

//Valid indexes
export type EthCallKeyId = [networkId: string, to: string, data: string];
export type EthCallKeyIdEq = EthCallId;

const EthCallById = createDexieIndexDefSingle(["networkId", "to", "data"] as ["networkId", "to", "data"]);
const EthCallByToMethodFormatFull = createDexieIndexDefSingle(["networkId", "to", "methodFormatFull"] as [
    "networkId",
    "to",
    "methodFormatFull",
]);
const EthCallByToMethodFormatFullArg0Idx = createDexieIndexDefSingle([
    "networkId",
    "to",
    "methodFormatFull",
    "arg0Idx",
] as ["networkId", "to", "methodFormatFull", "arg0Idx"]);
const EthCallByToMethodFormatFullArg1Idx = createDexieIndexDefSingle([
    "networkId",
    "to",
    "methodFormatFull",
    "arg1Idx",
] as ["networkId", "to", "methodFormatFull", "arg1Idx"]);
const EthCallByToMethodFormatFullArg2Idx = createDexieIndexDefSingle([
    "networkId",
    "to",
    "methodFormatFull",
    "arg2Idx",
] as ["networkId", "to", "methodFormatFull", "arg2Idx"]);
const EthCallByToMethodFormatFullReturnValueIdx = createDexieIndexDefSingle([
    "networkId",
    "to",
    "methodFormatFull",
    "returnValueIdx",
] as ["networkId", "to", "methodFormatFull", "returnValueIdx"]);
const EthCallByMethodFormatFull = createDexieIndexDefSingle(["networkId", "methodFormatFull"] as [
    "networkId",
    "methodFormatFull",
]);
const EthCallByMethodFormatFullArg0Idx = createDexieIndexDefSingle(["networkId", "methodFormatFull", "arg0Idx"] as [
    "networkId",
    "methodFormatFull",
    "arg0Idx",
]);
const EthCallByMethodFormatFullArg1Idx = createDexieIndexDefSingle(["networkId", "methodFormatFull", "arg1Idx"] as [
    "networkId",
    "methodFormatFull",
    "arg1Idx",
]);
const EthCallByMethodFormatFullArg2Idx = createDexieIndexDefSingle(["networkId", "methodFormatFull", "arg2Idx"] as [
    "networkId",
    "methodFormatFull",
    "arg2Idx",
]);
const EthCallByMethodFormatFullReturnValueIdx = createDexieIndexDefSingle([
    "networkId",
    "methodFormatFull",
    "returnValueIdx",
] as ["networkId", "methodFormatFull", "returnValueIdx"]);
export const EthCallIdx = [EthCallById].join(",") as Concat<[typeof EthCallById]>;
export type EthCallKeyIdx = {
    [EthCallById]: EthCallKeyId;
    [EthCallByToMethodFormatFull]: [networkId: string, to: string, methodFormatFull: string];
    [EthCallByToMethodFormatFullArg0Idx]: [networkId: string, to: string, methodFormatFull: string, arg0Idx: string];
    [EthCallByToMethodFormatFullArg1Idx]: [networkId: string, to: string, methodFormatFull: string, arg1Idx: string];
    [EthCallByToMethodFormatFullArg2Idx]: [networkId: string, to: string, methodFormatFull: string, arg2Idx: string];
    [EthCallByToMethodFormatFullReturnValueIdx]: [
        networkId: string,
        to: string,
        methodFormatFull: string,
        returnValueIdx: string,
    ];
    [EthCallByMethodFormatFull]: [networkId: string, methodFormatFull: string];
    [EthCallByMethodFormatFullArg0Idx]: [networkId: string, methodFormatFull: string, arg0Idx: string];
    [EthCallByMethodFormatFullArg1Idx]: [networkId: string, methodFormatFull: string, arg1Idx: string];
    [EthCallByMethodFormatFullArg2Idx]: [networkId: string, methodFormatFull: string, arg2Idx: string];
    [EthCallByMethodFormatFullReturnValueIdx]: [networkId: string, methodFormatFull: string, returnValueIdx: string];
};
export type EthCallKeyIdxEq =
    | EthCallId
    | ({ networkId: string } & ({ to: string } | {}) & { methodFormatFull: string } & (
              | { arg0Idx: string }
              | { arg1Idx: string }
              | { arg2Idx: string }
              | { returnValueIdx: string }
              | {}
          ));

export type EthCallKeyIdxEqAny =
    | { networkId: string[] | string; to: string[] | string; data: string }
    | ({ networkId: string[] | string } & ({ to: string[] | string } | {}) & { methodFormatFull: string[] | string } & (
              | { arg0Idx: string[] | string }
              | { arg1Idx: string[] | string }
              | { arg2Idx: string[] | string }
              | { returnValueIdx: string[] | string }
              | {}
          ));

export type EthCallTable = CRUDTable<
    typeof EthCallName,
    EthCall,
    EthCallKeyId,
    EthCallKeyIdEq,
    EthCallKeyIdx,
    EthCallKeyIdxEq
>;
