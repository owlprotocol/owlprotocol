import type { ERC721Id, ERC721, ERC721Name } from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { ERC721Id, ERC721 } from "@owlprotocol/web3-models";

export type ERC721KeyId = [networkId: string, address: string, tokenId: string];
export type ERC721KeyIdEq = ERC721Id;

const ERC721ById = createDexieIndexDefSingle(["networkId", "address", "tokenId"] as [
    "networkId",
    "address",
    "tokenId",
]);
const ERC721ByNetworkId = createDexieIndexDefSingle("networkId");
const ERC721ByAddress = createDexieIndexDefSingle(["networkId", "address"] as ["networkId", "address"]);
const ERC721ByNetworkIdOwner = createDexieIndexDefSingle(["networkId", "owner"] as ["networkId", "owner"]);
const ERC721ByOwner = createDexieIndexDefSingle("owner");
const ERC721ByTokenUri = createDexieIndexDefSingle("tokenURI");
export const ERC721Idx = [
    ERC721ById,
    ERC721ByNetworkId,
    ERC721ByAddress,
    ERC721ByNetworkIdOwner,
    ERC721ByOwner,
    ERC721ByTokenUri,
].join(",") as Concat<
    [
        typeof ERC721ById,
        typeof ERC721ByNetworkId,
        typeof ERC721ByAddress,
        typeof ERC721ByNetworkIdOwner,
        typeof ERC721ByOwner,
        typeof ERC721ByTokenUri,
    ]
>;
export type ERC721KeyIdx = {
    [ERC721ById]: ERC721KeyId;
    [ERC721ByNetworkId]: string;
    [ERC721ByAddress]: [networkId: string, address: string];
    [ERC721ByNetworkIdOwner]: [networkId: string, owner: string];
    [ERC721ByOwner]: string;
    [ERC721ByTokenUri]: string;
};

export type ERC721KeyIdxEq =
    | ERC721Id
    | { networkId: string }
    | { networkId: string; address: string }
    | { networkId: string; owner: string }
    | { owner: string }
    | { tokenURI: string };

export type ERC721KeyIdxEqAny =
    | { networkId: string[] | string; address: string[] | string; tokenId: string[] | string }
    | { networkId: string[] | string }
    | { networkId: string[] | string; address: string[] | string }
    | { networkId: string[] | string; owner: string[] | string }
    | { owner: string[] | string }
    | { tokenURI: string[] | string };

export type ERC721Table = CRUDTable<
    typeof ERC721Name,
    ERC721,
    ERC721KeyId,
    ERC721KeyIdEq,
    ERC721KeyIdx,
    ERC721KeyIdxEq
>;
