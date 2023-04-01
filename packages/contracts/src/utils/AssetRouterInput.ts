import { constants, utils } from "ethers";
import { AssetBasketInput, validateAssetBasketInput } from "./AssetLib.js";
import { AssetRouterInput as AssetRouterInputArtifact } from "../artifacts.js";
import type { AssetRouterInput } from "../ethers/types.js";

export interface AssetRouterInputInitializeArgs {
    admin: Parameters<AssetRouterInput["initialize"]>[0];
    contractUri?: Parameters<AssetRouterInput["initialize"]>[1];
    gsnForwarder?: Parameters<AssetRouterInput["initialize"]>[2];
    inputBaskets: AssetBasketInput[];
}

export function flattenInitArgsAssetRouterInput(args: AssetRouterInputInitializeArgs) {
    const { admin, contractUri, gsnForwarder, inputBaskets } = args;
    return [
        admin,
        contractUri ?? "",
        gsnForwarder ?? constants.AddressZero,
        inputBaskets.map(validateAssetBasketInput),
    ] as Parameters<AssetRouterInput["initialize"]>;
}

export const SupportsInputAsset = AssetRouterInputArtifact.abi.find((a: any) => a.name === "SupportsInputAsset");
export const SupportsInputAssetFragment = utils.EventFragment.from(SupportsInputAsset);
export const SupportsInputAssetTopic = SupportsInputAssetFragment.format(utils.FormatTypes.sighash);

export const RouteBasket = AssetRouterInputArtifact.abi.find((a: any) => a.name === "RouteBasket");
export const RouteBasketFragment = utils.EventFragment.from(RouteBasket);
export const RouteBasketTopic = RouteBasketFragment.format(utils.FormatTypes.sighash);
