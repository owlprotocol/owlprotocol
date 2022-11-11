import type { AssetRouterOutput } from '../ethers/types.js';

export type AssetRouterOutputBasket = Parameters<AssetRouterOutput['initialize']>[2][number];

export interface AssetRouterOutputInitializeArgs {
    admin: Parameters<AssetRouterOutput['initialize']>[0];
    contractUri: Parameters<AssetRouterOutput['initialize']>[1];
    outputBaskets: AssetRouterOutputBasket[];
    routers: Parameters<AssetRouterOutput['initialize']>[3];
}

export function flattenInitArgsAssetRouterOutput(args: AssetRouterOutputInitializeArgs) {
    const { admin, contractUri, outputBaskets, routers } = args;
    return [admin, contractUri, outputBaskets, routers] as Parameters<AssetRouterOutput['initialize']>;
}
