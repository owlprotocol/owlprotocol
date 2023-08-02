import { utils } from "ethers";
import {
    AssetBasketInput,
    AssetBasketOutput,
    validateAssetBasketInput,
    validateAssetBasketOutput,
} from "../AssetLib.js";
import { AssetRouterCraft__factory } from "../../typechain/ethers/factories/contracts/plugins/AssetRouter/AssetRouterCraft__factory.js";
import type { AssetRouterCraft } from "../../typechain/ethers/contracts/plugins/AssetRouter/AssetRouterCraft.js";

export interface AssetRouterCraftInitializeArgs {
    admin: Parameters<AssetRouterCraft["initialize"]>[0];
    contractUri?: Parameters<AssetRouterCraft["initialize"]>[1];
    inputBaskets: AssetBasketInput[];
    outputBaskets: AssetBasketOutput[];
}

export function initializeUtil(args: AssetRouterCraftInitializeArgs) {
    const { admin, contractUri, inputBaskets, outputBaskets } = args;
    return [
        admin,
        contractUri ?? "",
        inputBaskets.map(validateAssetBasketInput),
        outputBaskets.map(validateAssetBasketOutput),
    ] as [
            Parameters<AssetRouterCraft["initialize"]>[0],
            Parameters<AssetRouterCraft["initialize"]>[1],
            Parameters<AssetRouterCraft["initialize"]>[2],
            Parameters<AssetRouterCraft["initialize"]>[3],
        ]
}

export const AssetRouterCraftInterface = AssetRouterCraft__factory.createInterface();

export const SupportsInputAssetFragment = AssetRouterCraftInterface.getEvent("SupportsInputAsset");
export const SupportsInputAssetTopic = SupportsInputAssetFragment.format(utils.FormatTypes.sighash);

export const SupportsOutputAssetFragment = AssetRouterCraftInterface.getEvent("SupportsOutputAsset");
export const SupportsOutputAssetTopic = SupportsOutputAssetFragment.format(utils.FormatTypes.sighash);

export const RouteBasketFragment = AssetRouterCraftInterface.getEvent("RouteBasket");
export const RouteBasketTopic = RouteBasketFragment.format(utils.FormatTypes.sighash);

export const UpdateBasketFragment = AssetRouterCraftInterface.getEvent("UpdateBasket");
export const UpdateBasketTopic = UpdateBasketFragment.format(utils.FormatTypes.sighash);
