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

//Valid indexes
export type AssetRouterPathIndexInput =
    | AssetRouterPathId
    | { networkId: string; from: string }
    | { networkId: string; to: string };

export const AssetRouterPathIndex = "[networkId+from+to],[networkId+to]";

/** @internal */
export function validateId({ networkId, from, to }: AssetRouterPathId): AssetRouterPathId {
    return {
        networkId: networkId,
        from: from.toLowerCase(),
        to: to.toLowerCase(),
    };
}

export function toPrimaryKey({ networkId, from, to }: AssetRouterPathId): [string, string, string] {
    return [networkId, from.toLowerCase(), to.toLowerCase()];
}

/** @internal */
export function validate(item: AssetRouterPath): AssetRouterPath {
    const item2: AssetRouterPath = {
        ...item,
        ...validateId(item),
    };
    return omitBy(item2, isUndefined) as AssetRouterPath;
}
