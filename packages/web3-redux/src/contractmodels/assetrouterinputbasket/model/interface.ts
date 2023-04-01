import { AssetBasketInput } from "@owlprotocol/contracts/lib/types/utils/AssetLib";
import { isUndefined, omitBy, zip } from "lodash-es";

/** AssetRouterInputBasket id components */
export interface AssetRouterInputBasketId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly basketId: string;
    readonly assetAddress: string;
    //Always 0 for ERC20 | ERC721
    readonly erc1155Id: string;
}

export interface AssetRouterInputBasket extends AssetRouterInputBasketId {
    readonly assetType?: "ERC20" | "ERC721" | "ERC1155";
    readonly assetBurned?: boolean;
    readonly assetBurnAddress?: string;
    readonly assetAmount?: string;
    readonly assetNTime?: string;
}

//Valid indexes
export type AssetRouterInputBasketIndexInput =
    | AssetRouterInputBasketId
    | { networkId: string; address: string; basketId: string }
    | {
          networkId: string;
          address: string;
          assetAddress: string;
          erc1155Id: string;
      }
    | { networkId: string; address: string; assetAddress: string }
    | { networkId: string; assetAddress: string; erc1155Id: string }
    | { networkId: string; assetAddress: string };

export type AssetRouterInputBasketIndexInputAnyOf =
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
      }
    | {
          networkId: string[] | string;
          address: string[] | string;
          assetAddress: string[] | string;
      }
    | {
          networkId: string[] | string;
          assetAddress: string[] | string;
          erc1155Id: string[] | string;
      }
    | { networkId: string[] | string; assetAddress: string[] | string };

export const AssetRouterInputBasketIndex =
    "[networkId+address+basketId+assetAddress+erc1155Id],\
[networkId+address+assetAddress+erc1155Id],\
[networkId+assetAddress+erc1155Id]";

/** @internal */
export function validateId({
    networkId,
    address,
    basketId,
    assetAddress,
    erc1155Id,
}: AssetRouterInputBasketId): AssetRouterInputBasketId {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        basketId,
        assetAddress: assetAddress.toLowerCase(),
        erc1155Id: erc1155Id,
    };
}

export function toPrimaryKey({
    networkId,
    address,
    basketId,
    assetAddress,
    erc1155Id,
}: AssetRouterInputBasketId): [string, string, string, string, string] {
    return [networkId, address.toLowerCase(), basketId, assetAddress.toLowerCase(), erc1155Id];
}

/** @internal */
export function validate(item: AssetRouterInputBasket): AssetRouterInputBasket {
    const item2: AssetRouterInputBasket = {
        ...item,
        ...validateId(item),
    };
    return omitBy(item2, isUndefined) as AssetRouterInputBasket;
}

export function assetRouterInputBasketsFromSolidityBasket(
    networkId: string,
    address: string,
    basketId: string,
    basket: AssetBasketInput,
): AssetRouterInputBasket[] {
    const upserts: AssetRouterInputBasket[] = [];
    basket.erc20Unaffected?.forEach((a) => {
        upserts.push({
            networkId,
            address,
            basketId,
            assetAddress: a.contractAddr,
            erc1155Id: "0",
            assetType: "ERC20",
            assetBurned: false,
            assetAmount: a.amount.toString(),
            assetBurnAddress: basket.burnAddress,
        });
    });
    basket.erc20Burned?.forEach((a) => {
        upserts.push({
            networkId,
            address,
            basketId,
            assetAddress: a.contractAddr,
            erc1155Id: "0",
            assetType: "ERC20",
            assetBurned: true,
            assetAmount: a.amount.toString(),
            assetBurnAddress: basket.burnAddress,
        });
    });
    basket.erc721Unaffected?.forEach((a) => {
        upserts.push({
            networkId,
            address,
            basketId,
            assetAddress: a.contractAddr,
            erc1155Id: "0",
            assetType: "ERC721",
            assetBurned: false,
            assetAmount: "1",
            assetBurnAddress: basket.burnAddress,
        });
    });
    basket.erc721Burned?.forEach((a) => {
        upserts.push({
            networkId,
            address,
            basketId,
            assetAddress: a.contractAddr,
            erc1155Id: "0",
            assetType: "ERC721",
            assetBurned: true,
            assetAmount: "1",
            assetBurnAddress: basket.burnAddress,
        });
    });
    zip(basket.erc721NTime ?? [], basket.erc721NTimeMax ?? [])?.forEach(([a, ntime]) => {
        upserts.push({
            networkId,
            address,
            basketId,
            assetAddress: a!.contractAddr,
            erc1155Id: "0",
            assetType: "ERC721",
            assetBurned: false,
            assetAmount: "1",
            assetBurnAddress: basket.burnAddress,
            assetNTime: ntime?.toString(),
        });
    });
    basket.erc1155Unaffected?.forEach((a) => {
        zip(a.tokenIds, a.amounts).forEach(([id, amount]) => {
            upserts.push({
                networkId,
                address,
                basketId,
                assetAddress: a.contractAddr,
                erc1155Id: id!.toString(),
                assetType: "ERC1155",
                assetBurned: false,
                assetAmount: amount!.toString(),
                assetBurnAddress: basket.burnAddress,
            });
        });
    });
    basket.erc1155Burned?.forEach((a) => {
        zip(a.tokenIds, a.amounts).forEach(([id, amount]) => {
            upserts.push({
                networkId,
                address,
                basketId,
                assetAddress: a.contractAddr,
                erc1155Id: id!.toString(),
                assetType: "ERC1155",
                assetBurned: true,
                assetAmount: amount!.toString(),
                assetBurnAddress: basket.burnAddress,
            });
        });
    });

    return upserts.map(validate);
}
