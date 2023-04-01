import type {
    AssetRouterInputBasketId,
    AssetRouterInputBasket,
    AssetRouterInputBasketName,
} from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { AssetRouterInputBasketId, AssetRouterInputBasket } from "@owlprotocol/web3-models";

export type AssetRouterInputBasketKeyId = [
    networkId: string,
    address: string,
    basketId: string,
    assetAddress: string,
    erc1155Id: string,
];
export type AssetRouterInputBasketKeyIdEq = AssetRouterInputBasketId;

const AssetRouterInputBasketById = createDexieIndexDefSingle([
    "networkId",
    "address",
    "basketId",
    "assetAddress",
    "erc1155Id",
] as ["networkId", "address", "basketId", "assetAddress", "erc1155Id"]);
const AssetRouterInputBasketByBasketId = createDexieIndexDefSingle(["networkId", "address", "basketId"] as [
    "networkId",
    "address",
    "basketId",
]);
const AssetRouterInputBasketByAsset = createDexieIndexDefSingle([
    "networkId",
    "address",
    "assetAddress",
    "erc1155Id",
] as ["networkId", "address", "assetAddress", "erc1155Id"]);
export const AssetRouterInputBasketIdx = [
    AssetRouterInputBasketById,
    AssetRouterInputBasketByBasketId,
    AssetRouterInputBasketByAsset,
].join(",") as Concat<
    [typeof AssetRouterInputBasketById, typeof AssetRouterInputBasketByBasketId, typeof AssetRouterInputBasketByAsset]
>;
export type AssetRouterInputBasketKeyIdx = {
    [AssetRouterInputBasketById]: AssetRouterInputBasketKeyId;
    [AssetRouterInputBasketByBasketId]: [networkId: string, address: string, basketId: string];
    [AssetRouterInputBasketByAsset]: [networkId: string, assetAddress: string, erc1555Id: string];
};

export type AssetRouterInputBasketKeyIdxEq =
    | AssetRouterInputBasketId
    | { networkId: string; address: string; basketId: string }
    | { networkId: string; assetAddress: string; erc1155Id: string };

export type AssetRouterInputBasketKeyIdxEqAny =
    | {
          networkId: string[] | string;
          address: string[] | string;
          basketId: string[] | string;
          assetAddress: string[] | string;
          erc1155Id: string[] | string;
      }
    | {
          networkId: string[] | string;
          address: string[] | string;
          basketId: string[] | string;
      }
    | {
          networkId: string[] | string;
          address: string[] | string;
          assetAddress: string[] | string;
          erc1155Id: string[] | string;
      };

export type AssetRouterInputBasketTable = CRUDTable<
    typeof AssetRouterInputBasketName,
    AssetRouterInputBasket,
    AssetRouterInputBasketKeyId,
    AssetRouterInputBasketKeyIdEq,
    AssetRouterInputBasketKeyIdx,
    AssetRouterInputBasketKeyIdxEq
>;
