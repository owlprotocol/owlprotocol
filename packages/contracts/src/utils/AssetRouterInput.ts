import type { AssetRouterInput } from '../ethers/types.js';

export type AssetRouterInputBasket = Parameters<AssetRouterInput['initialize']>[3][number];

export interface AssetRouterInputInitializeArgs {
    admin: Parameters<AssetRouterInput['initialize']>[0];
    contractUri: Parameters<AssetRouterInput['initialize']>[1];
    gsnForwarder: Parameters<AssetRouterInput['initialize']>[2];
    inputBaskets: AssetRouterInputBasket[];
}

export function flattenInitArgsAssetRouterInput(args: AssetRouterInputInitializeArgs) {
    const { admin, contractUri, gsnForwarder, inputBaskets } = args;
    return [admin, contractUri, gsnForwarder, inputBaskets] as Parameters<AssetRouterInput['initialize']>;
}
