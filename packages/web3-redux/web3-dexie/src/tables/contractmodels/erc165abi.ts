import type { ERC165AbiId, ERC165Abi, ERC165AbiName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { ERC165AbiId, ERC165Abi } from "@owlprotocol/web3-models";

export type ERC165AbiKeyId = string;
export type ERC165AbiKeyIdEq = ERC165AbiId;

const ERC165AbiById = createDexieIndexDefSingle("interfaceId");
const ERC165AbiByName = createDexieIndexDefSingle("name");

export const ERC165AbiIdx = [ERC165AbiById, ERC165AbiByName].join(",") as Concat<
    [typeof ERC165AbiById, typeof ERC165AbiByName]
>;
export type ERC165AbiKeyIdx = {
    [ERC165AbiById]: ERC165AbiKeyId;
    [ERC165AbiByName]: string;
};

export type ERC165AbiKeyIdxEq = ERC165AbiId | { name: string };

export type ERC165AbiKeyIdxEqAny = { interfaceId: string[] | string } | { name: string[] | string };

export type ERC165AbiTable = CRUDTable<
    typeof ERC165AbiName,
    ERC165Abi,
    ERC165AbiKeyId,
    ERC165AbiKeyIdEq,
    ERC165AbiKeyIdx,
    ERC165AbiKeyIdxEq
>;
