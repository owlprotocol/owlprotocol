import { utils } from "ethers";
import { AssetBasketOutput, validateAssetBasketOutput } from "../AssetLib.js";
import { AssetRouterOutput__factory } from "../../typechain/ethers/factories/contracts/plugins/AssetRouter/AssetRouterOutput__factory.js";
import type { AssetRouterOutput } from "../../typechain/ethers/contracts/plugins/AssetRouter/AssetRouterOutput.js";

export interface AssetRouterOutputInitializeArgs {
    admin: Parameters<AssetRouterOutput["initialize"]>[0];
    contractUri?: Parameters<AssetRouterOutput["initialize"]>[1];
    outputBaskets: AssetBasketOutput[];
    routers: Parameters<AssetRouterOutput["initialize"]>[3];
}

export function initializeUtil(args: AssetRouterOutputInitializeArgs) {
    const { admin, contractUri, outputBaskets, routers } = args;
    return [admin, contractUri ?? "", outputBaskets.map(validateAssetBasketOutput), routers] as [
        Parameters<AssetRouterOutput["initialize"]>[0],
        Parameters<AssetRouterOutput["initialize"]>[1],
        Parameters<AssetRouterOutput["initialize"]>[2],
        Parameters<AssetRouterOutput["initialize"]>[3],
    ]
}

export const AssetRouterOutputInterface = AssetRouterOutput__factory.createInterface();

export const SupportsOutputAssetFragment = AssetRouterOutputInterface.getEvent("SupportsOutputAsset");
export const SupportsOutputAssetTopic = SupportsOutputAssetFragment.format(utils.FormatTypes.sighash);

export const RouteBasketFragment = AssetRouterOutputInterface.getEvent("RouteBasket");
export const RouteBasketTopic = RouteBasketFragment.format(utils.FormatTypes.sighash);

export const UpdateBasketFragment = AssetRouterOutputInterface.getEvent("UpdateBasket");
export const UpdateBasketTopic = UpdateBasketFragment.format(utils.FormatTypes.sighash);
