import { isUndefined, omitBy } from "lodash-es";

/** AssetRouterPath id components */
export interface AssetRouterPathId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly from: string;
    readonly to: string;
}

export type AssetRouterPath = AssetRouterPathId;

/** @internal */
export function validateIdAssetRouterPath({ networkId, from, to }: AssetRouterPathId): AssetRouterPathId {
    return {
        networkId: networkId,
        from: from.toLowerCase(),
        to: to.toLowerCase(),
    };
}

export function toPrimaryKeyAssetRouterPath({ networkId, from, to }: AssetRouterPathId): [string, string, string] {
    return [networkId, from.toLowerCase(), to.toLowerCase()];
}

/** @internal */
export function validateAssetRouterPath(item: AssetRouterPath): AssetRouterPath {
    const item2: AssetRouterPath = {
        ...item,
        ...validateIdAssetRouterPath(item),
    };
    return omitBy(item2, isUndefined) as AssetRouterPath;
}
