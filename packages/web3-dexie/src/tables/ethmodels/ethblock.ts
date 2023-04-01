import type { EthBlockId, EthBlock, EthBlockName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";

export type { EthBlockId, EthBlock } from "@owlprotocol/web3-models";
export type EthBlockKeyId = [networkId: string, number: number];
export type EthBlockKeyIdEq = EthBlockId;

const EthBlockById = createDexieIndexDefSingle(["networkId", "number"] as ["networkId", "number"]);
const EthBlockByNetworkId = createDexieIndexDefSingle("networkId");
const EthBlockByHash = createDexieIndexDefSingle("hash");
const EthBlockByTimestamp = createDexieIndexDefSingle("timestamp");
export const EthBlockIdx = [EthBlockById, EthBlockByNetworkId, EthBlockByHash, EthBlockByTimestamp].join(",") as Concat<
    [typeof EthBlockById, typeof EthBlockByNetworkId, typeof EthBlockByHash, typeof EthBlockByTimestamp]
>;
export type EthBlockKeyIdx = {
    [EthBlockById]: EthBlockKeyId;
    [EthBlockByNetworkId]: string;
    [EthBlockByHash]: string;
    [EthBlockByTimestamp]: string;
};
export type EthBlockKeyIdxEq = EthBlockId | { networkId: string } | { hash: string } | { timestamp: string };
export type EthBlockKeyIdxEqAny =
    | { networkId: string[] | string; number: number[] | number }
    | { networkId: string[] | string; hash: string[] | string };

export type EthBlockTable = CRUDTable<
    typeof EthBlockName,
    EthBlock,
    EthBlockKeyId,
    EthBlockKeyIdEq,
    EthBlockKeyIdx,
    EthBlockKeyIdxEq
>;
