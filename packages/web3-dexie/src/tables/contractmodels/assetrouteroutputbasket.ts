import type {
    AssetRouterOutputBasketId,
    AssetRouterOutputBasket,
    AssetRouterOutputBasketName,
} from "@owlprotocol/web3-models";
import type { CRUDTable } from "@owlprotocol/crud-dexie";
import { createDexieIndexDefSingle } from "@owlprotocol/crud-dexie";
import type { Concat } from "@owlprotocol/utils";
export type { AssetRouterOutputBasketId, AssetRouterOutputBasket } from "@owlprotocol/web3-models";

export type AssetRouterOutputBasketKeyId = [
    networkId: string,
    address: string,
    basketId: string,
    assetAddress: string,
    erc1155Id: string,
];
export type AssetRouterOutputBasketKeyIdEq = AssetRouterOutputBasketId;

const AssetRouterOutputBasketById = createDexieIndexDefSingle([
    "networkId",
    "address",
    "basketId",
    "assetAddress",
    "erc1155Id",
] as ["networkId", "address", "basketId", "assetAddress", "erc1155Id"]);
const AssetRouterOutputBasketByBasketId = createDexieIndexDefSingle(["networkId", "address", "basketId"] as [
    "networkId",
    "address",
    "basketId",
]);
const AssetRouterOutputBasketByAsset = createDexieIndexDefSingle([
    "networkId",
    "address",
    "assetAddress",
    "erc1155Id",
] as ["networkId", "address", "assetAddress", "erc1155Id"]);
export const AssetRouterOutputBasketIdx = [
    AssetRouterOutputBasketById,
    AssetRouterOutputBasketByBasketId,
    AssetRouterOutputBasketByAsset,
].join(",") as Concat<
    [
        typeof AssetRouterOutputBasketById,
        typeof AssetRouterOutputBasketByBasketId,
        typeof AssetRouterOutputBasketByAsset,
    ]
>;
export type AssetRouterOutputBasketKeyIdx = {
    [AssetRouterOutputBasketById]: AssetRouterOutputBasketKeyId;
    [AssetRouterOutputBasketByBasketId]: [networkId: string, address: string, basketId: string];
    [AssetRouterOutputBasketByAsset]: [networkId: string, assetAddress: string, erc1555Id: string];
};

export type AssetRouterOutputBasketKeyIdxEq =
    | AssetRouterOutputBasketId
    | { networkId: string; address: string; basketId: string }
    | { networkId: string; assetAddress: string; erc1155Id: string };

export type AssetRouterOutputBasketKeyIdxEqAny =
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

export type AssetRouterOutputBasketTable = CRUDTable<
    typeof AssetRouterOutputBasketName,
    AssetRouterOutputBasket,
    AssetRouterOutputBasketKeyId,
    AssetRouterOutputBasketKeyIdEq,
    AssetRouterOutputBasketKeyIdx,
    AssetRouterOutputBasketKeyIdxEq
>;
