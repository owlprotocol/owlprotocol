import { isUndefined, omitBy } from "lodash-es";

/** ERC20 id components */
export interface ERC20Id {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
}

export interface ERC20 extends ERC20Id {
    readonly name?: string;
    readonly symbol?: string;
    readonly decimals?: number;
    readonly totalSupply?: string;
}

/** @internal */
export function validateIdERC20({ networkId, address }: ERC20Id): ERC20Id {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
    };
}

export function toPrimaryKeyERC20({ networkId, address }: ERC20Id): [string, string] {
    return [networkId, address.toLowerCase()];
}

/** @internal */
export function validateERC20(item: ERC20): ERC20 {
    const item2: ERC20 = {
        ...item,
        ...validateIdERC20(item),
    };
    return omitBy(item2, isUndefined) as ERC20;
}
