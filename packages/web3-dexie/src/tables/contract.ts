import type { ContractId, Contract, ContractName } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { ContractId, Contract } from "@owlprotocol/web3-models";

export type ContractKeyId = [networkId: string, address: string];
export type ContractKeyIdEq = ContractId;
const ContractById = createDexieIndexDefSingle(["networkId", "address"] as ["networkId", "address"]);
const ContractByNetworkId = createDexieIndexDefSingle("networkId");
const ContractByLabel = createDexieIndexDefSingle("label");
const ContractByTags = createDexieIndexDefSingle("tags", true);
const ContractByMetadataURI = createDexieIndexDefSingle("metadataURI");
export const ContractIdx = [ContractById].join(",") as Concat<
    [
        typeof ContractById,
        typeof ContractByNetworkId,
        typeof ContractByLabel,
        typeof ContractByTags,
        typeof ContractByMetadataURI,
    ]
>;
export type ContractKeyIdx = {
    [ContractById]: ContractKeyId;
    [ContractByNetworkId]: string;
    [ContractByLabel]: string;
    [ContractByTags]: string;
    [ContractByMetadataURI]: string;
};
export type ContractKeyIdxEq =
    | ContractId
    | { networkId: string }
    | { label: string }
    | { tags: string[] }
    | { metadataURI: string };
export type ContractKeyIdxEqAny =
    | { networkId: string[] | string; address: string }
    | { networkId: string[] | string }
    | { label: string[] | string }
    | { tags: string[] }
    | { metadataURI: string[] | string };

export type ContractTable = CRUDTable<
    typeof ContractName,
    Contract,
    ContractKeyId,
    ContractKeyIdEq,
    ContractKeyIdx,
    ContractKeyIdxEq
>;
