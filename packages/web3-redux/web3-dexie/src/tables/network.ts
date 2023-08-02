import type { NetworkId, Network, NetworkName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { NetworkId, Network } from "@owlprotocol/web3-models";

export type NetworkKeyId = string;
export type NetworkKeyIdEq = NetworkId;
const NetworkById = createDexieIndexDefSingle("networkId");
export const NetworkIdx = [NetworkById].join(",") as Concat<[typeof NetworkById]>;
export type NetworkKeyIdx = {
    [NetworkById]: NetworkKeyId;
};
export type NetworkKeyIdxEq = NetworkId;
export type NetworkKeyIdxEqAny = { networkId: string[] | string };

export type NetworkTable = CRUDTable<
    typeof NetworkName,
    Network,
    NetworkKeyId,
    NetworkKeyIdEq,
    NetworkKeyIdx,
    NetworkKeyIdxEq
>;
