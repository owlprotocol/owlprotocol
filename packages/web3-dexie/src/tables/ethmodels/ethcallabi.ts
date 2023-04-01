import type { EthCallAbiId, EthCallAbi, EthCallAbiName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { EthCallAbiId, EthCallAbi } from "@owlprotocol/web3-models";

//Valid indexes
export type EthCallAbiKeyId = string;
export type EthCallAbiKeyIdEq = EthCallAbiId;

const EthCallAbiById = createDexieIndexDefSingle("methodFormatFull");
const EthCallAbiByMethodSighash = createDexieIndexDefSingle("methodSighash");
export const EthCallAbiIdx = [EthCallAbiById, EthCallAbiByMethodSighash].join(",") as Concat<
    [typeof EthCallAbiById, typeof EthCallAbiByMethodSighash]
>;
export type EthCallAbiKeyIdx = {
    [EthCallAbiById]: EthCallAbiKeyId;
    [EthCallAbiByMethodSighash]: string;
};
export type EthCallAbiKeyIdxEq = EthCallAbiId | { methodSighash: string };
export type EthCallAbiKeyIdxEqAny = { methodFormatFull: string[] | string } | { methodSighash: string[] | string };

export type EthCallAbiTable = CRUDTable<
    typeof EthCallAbiName,
    EthCallAbi,
    EthCallAbiKeyId,
    EthCallAbiKeyIdEq,
    EthCallAbiKeyIdx,
    EthCallAbiKeyIdxEq
>;
