import type { EthLogAbiId, EthLogAbi, EthLogAbiName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { EthLogAbiId, EthLogAbi } from "@owlprotocol/web3-models";

export type EthLogAbiKeyId = string;
export type EthLogAbiKeyIdEq = EthLogAbiId;

const EthLogAbiById = createDexieIndexDefSingle("eventFormatFull");
const EthLogAbiByEventSighash = createDexieIndexDefSingle("eventSighash");
export const EthLogAbiIdx = [EthLogAbiById, EthLogAbiByEventSighash].join(",") as Concat<
    [typeof EthLogAbiById, typeof EthLogAbiByEventSighash]
>;
export type EthLogAbiKeyIdx = {
    [EthLogAbiById]: EthLogAbiKeyId;
    [EthLogAbiByEventSighash]: string;
};
export type EthLogAbiKeyIdxEq = EthLogAbiId | { eventSighash: string };
export type EthLogAbiKeyIdxEqAny = { eventFormatFull: string[] | string } | { eventSighash: string[] | string };

export type EthLogAbiTable = CRUDTable<
    typeof EthLogAbiName,
    EthLogAbi,
    EthLogAbiKeyId,
    EthLogAbiKeyIdEq,
    EthLogAbiKeyIdx,
    EthLogAbiKeyIdxEq
>;
