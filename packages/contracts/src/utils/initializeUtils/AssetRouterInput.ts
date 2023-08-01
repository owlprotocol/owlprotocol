import { constants, utils } from "ethers";
import { AssetBasketInput, validateAssetBasketInput } from "../AssetLib.js";
import { AssetRouterInput__factory } from "../../typechain/ethers/factories/contracts/plugins/AssetRouter/AssetRouterInput__factory.js";
import type { AssetRouterInput } from "../../typechain/ethers/contracts/plugins/AssetRouter/AssetRouterInput.js";

export interface AssetRouterInputInitializeArgs {
    admin: Parameters<AssetRouterInput["initialize"]>[0];
    contractUri?: Parameters<AssetRouterInput["initialize"]>[1];
    gsnForwarder?: Parameters<AssetRouterInput["initialize"]>[2];
    inputBaskets: AssetBasketInput[];
}

export function initializeUtil(args: AssetRouterInputInitializeArgs) {
    const { admin, contractUri, gsnForwarder, inputBaskets } = args;
    return [
        admin,
        contractUri ?? "",
        gsnForwarder ?? constants.AddressZero,
        inputBaskets.map(validateAssetBasketInput),
    ] as [
            Parameters<AssetRouterInput["initialize"]>[0],
            Parameters<AssetRouterInput["initialize"]>[1],
            Parameters<AssetRouterInput["initialize"]>[2],
            Parameters<AssetRouterInput["initialize"]>[3],
        ]
}

export const AssetRouterInputInterface = AssetRouterInput__factory.createInterface();

export const SupportsInputAssetFragment = AssetRouterInputInterface.getEvent("SupportsInputAsset");
export const SupportsInputAssetTopic = SupportsInputAssetFragment.format(utils.FormatTypes.sighash);

export const RouteBasketFragment = AssetRouterInputInterface.getEvent("RouteBasket");
export const RouteBasketTopic = RouteBasketFragment.format(utils.FormatTypes.sighash);
