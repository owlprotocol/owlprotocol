import type { AssetBasketOutput } from "@owlprotocol/contracts/lib/types/utils/AssetLib";
import { isUndefined, omitBy, zip } from "lodash-es";

/** AssetRouterOutputBasket id components */
export interface AssetRouterOutputBasketId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly basketId: string;
    readonly assetAddress: string;
    //Always 0 for ERC20 | ERC721
    readonly erc1155Id: string;
}

export interface AssetRouterOutputBasket extends AssetRouterOutputBasketId {
    readonly assetType?: "ERC20" | "ERC721" | "ERC1155";
    readonly assetAmount?: string;
}

/** @internal */
export function validateIdAssetRouterOutputBasket({
    networkId,
    address,
    basketId,
    assetAddress,
    erc1155Id,
}: AssetRouterOutputBasketId): AssetRouterOutputBasketId {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        basketId,
        assetAddress: assetAddress.toLowerCase(),
        erc1155Id,
    };
}

export function toPrimaryKeyAssetRouterOutputBasket({
    networkId,
    address,
    basketId,
    assetAddress,
    erc1155Id,
}: AssetRouterOutputBasketId): [string, string, string, string, string] {
    return [networkId, address.toLowerCase(), basketId, assetAddress.toLowerCase(), erc1155Id];
}

/** @internal */
export function validateAssetRouterOutputBasket(item: AssetRouterOutputBasket): AssetRouterOutputBasket {
    const item2: AssetRouterOutputBasket = {
        ...item,
        ...validateIdAssetRouterOutputBasket(item),
    };
    return omitBy(item2, isUndefined) as AssetRouterOutputBasket;
}

export function assetRouterOutputBasketsFromSolidityBasket(
    networkId: string,
    address: string,
    basketId: string,
    basket: AssetBasketOutput,
): AssetRouterOutputBasket[] {
    const upserts: AssetRouterOutputBasket[] = [];
    basket.erc20Mint?.forEach((a) => {
        upserts.push({
            networkId,
            address,
            basketId,
            assetAddress: a.contractAddr,
            erc1155Id: "0",
            assetType: "ERC20",
            assetAmount: a.amount.toString(),
        });
    });
    basket.erc721MintAutoId?.forEach((a) => {
        upserts.push({
            networkId,
            address,
            basketId,
            assetAddress: a.contractAddr,
            erc1155Id: "0",
            assetType: "ERC721",
            assetAmount: "1",
        });
    });
    basket.erc1155Mint?.forEach((a) => {
        zip(a.tokenIds, a.amounts).forEach(([id, amount]) => {
            upserts.push({
                networkId,
                address,
                basketId,
                assetAddress: a.contractAddr,
                erc1155Id: id!.toString(),
                assetType: "ERC1155",
                assetAmount: amount!.toString(),
            });
        });
    });

    return upserts.map(validateAssetRouterOutputBasket);
}
