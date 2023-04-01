import { isUndefined, omitBy } from "lodash-es";

/** ERC165 id components */
export interface ERC165Id {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly interfaceId: string;
}

export type ERC165 = ERC165Id;

/** @internal */
export function validateIdERC165({ networkId, address, interfaceId }: ERC165Id): ERC165Id {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        interfaceId,
    };
}

export function toPrimaryKeyERC165({ networkId, address, interfaceId }: ERC165Id): [string, string, string] {
    return [networkId, address.toLowerCase(), interfaceId];
}

/** @internal */
export function validateERC165(item: ERC165): ERC165 {
    const item2: ERC165 = {
        ...item,
        ...validateIdERC165(item),
    };
    return omitBy(item2, isUndefined) as ERC165;
}
