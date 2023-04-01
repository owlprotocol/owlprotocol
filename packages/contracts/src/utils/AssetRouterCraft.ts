import { constants, utils } from "ethers";
import {
    AssetBasketInput,
    AssetBasketOutput,
    validateAssetBasketInput,
    validateAssetBasketOutput,
} from "./AssetLib.js";
import { AssetRouterCraft as AssetRouterCraftArtifact } from "../artifacts.js";
import type { AssetRouterCraft } from "../ethers/types.js";

export interface AssetRouterCraftInitializeArgs {
    admin: Parameters<AssetRouterCraft["initialize"]>[0];
    contractUri?: Parameters<AssetRouterCraft["initialize"]>[1];
    gsnForwarder?: Parameters<AssetRouterCraft["initialize"]>[2];
    inputBaskets: AssetBasketInput[];
    outputBaskets: AssetBasketOutput[];
}

export function flattenInitArgsAssetRouterCraft(args: AssetRouterCraftInitializeArgs) {
    const { admin, contractUri, gsnForwarder, inputBaskets, outputBaskets } = args;
    return [
        admin,
        contractUri ?? "",
        gsnForwarder ?? constants.AddressZero,
        inputBaskets.map(validateAssetBasketInput),
        outputBaskets.map(validateAssetBasketOutput),
    ] as Parameters<AssetRouterCraft["initialize"]>;
}

export const SupportsInputAsset = AssetRouterCraftArtifact.abi.find((a: any) => a.name === "SupportsInputAsset");
export const SupportsInputAssetFragment = utils.EventFragment.from(SupportsInputAsset);
export const SupportsInputAssetTopic = SupportsInputAssetFragment.format(utils.FormatTypes.sighash);

export const SupportsOutputAsset = AssetRouterCraftArtifact.abi.find((a: any) => a.name === "SupportsOutputAsset");
export const SupportsOutputAssetFragment = utils.EventFragment.from(SupportsOutputAsset);
export const SupportsOutputAssetTopic = SupportsOutputAssetFragment.format(utils.FormatTypes.sighash);

export const RouteBasket = AssetRouterCraftArtifact.abi.find((a: any) => a.name === "RouteBasket");
export const RouteBasketFragment = utils.EventFragment.from(RouteBasket);
export const RouteBasketTopic = RouteBasketFragment.format(utils.FormatTypes.sighash);

export const UpdateBasket = AssetRouterCraftArtifact.abi.find((a: any) => a.name === "UpdateBasket");
export const UpdateBasketFragment = utils.EventFragment.from(UpdateBasket);
export const UpdateBasketTopic = UpdateBasketFragment.format(utils.FormatTypes.sighash);
