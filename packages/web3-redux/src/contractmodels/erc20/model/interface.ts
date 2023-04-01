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

//Valid indexes
export type ERC20IndexInput =
    | ERC20Id
    //Indices
    | { networkId: string };

export type ERC20IndexInputAnyOf =
    | { networkId: string[] | string; address: string[] | string }
    | { networkId: string[] | string };

export const ERC20Index = "[networkId+address]";

/** @internal */
export function validateId({ networkId, address }: ERC20Id): ERC20Id {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
    };
}

export function toPrimaryKey({ networkId, address }: ERC20Id): [string, string] {
    return [networkId, address.toLowerCase()];
}

/** @internal */
export function validate(item: ERC20): ERC20 {
    const item2: ERC20 = {
        ...item,
        ...validateId(item),
    };
    return omitBy(item2, isUndefined) as ERC20;
}
