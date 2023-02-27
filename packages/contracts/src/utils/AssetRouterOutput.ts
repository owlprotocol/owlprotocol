import type { AssetRouterOutput } from '../ethers/types.js';
import { utils } from 'ethers';
import { AssetRouterOutput as AssetRouterOutputArtifact } from '../artifacts.js'
import { AssetBasketOutput, validateAssetBasketOutput } from './AssetLib.js';

export interface AssetRouterOutputInitializeArgs {
    admin: Parameters<AssetRouterOutput['initialize']>[0];
    contractUri?: Parameters<AssetRouterOutput['initialize']>[1];
    outputBaskets: AssetBasketOutput[];
    routers: Parameters<AssetRouterOutput['initialize']>[3];
}

export function flattenInitArgsAssetRouterOutput(args: AssetRouterOutputInitializeArgs) {
    const { admin, contractUri, outputBaskets, routers } = args;
    return [
        admin,
        contractUri ?? '',
        outputBaskets.map(validateAssetBasketOutput),
        routers
    ] as Parameters<AssetRouterOutput['initialize']>;
}

export const SupportsOutputAsset = AssetRouterOutputArtifact.abi.find((a: any) => a.name === 'SupportsOutputAsset');
export const SupportsOutputAssetFragment = utils.EventFragment.from(SupportsOutputAsset)
export const SupportsOutputAssetTopic = SupportsOutputAssetFragment.format(utils.FormatTypes.sighash)

export const RouteBasket = AssetRouterOutputArtifact.abi.find((a: any) => a.name === 'RouteBasket');
export const RouteBasketFragment = utils.EventFragment.from(RouteBasket)
export const RouteBasketTopic = RouteBasketFragment.format(utils.FormatTypes.sighash)

export const UpdateBasket = AssetRouterOutputArtifact.abi.find((a: any) => a.name === 'UpdateBasket');
export const UpdateBasketFragment = utils.EventFragment.from(UpdateBasket)
export const UpdateBasketTopic = UpdateBasketFragment.format(utils.FormatTypes.sighash)
