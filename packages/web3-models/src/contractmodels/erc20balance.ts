import { isUndefined, omitBy } from "lodash-es";

/** ERC20Balance id components */
export interface ERC20BalanceId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly account: string;
}

export interface ERC20Balance extends ERC20BalanceId {
    readonly balance?: string;
}

/** @internal */
export function validateIdERC20Balance({ networkId, address, account }: ERC20BalanceId): ERC20BalanceId {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        account: account.toLowerCase(),
    };
}

export function toPrimaryKeyERC20Balance({ networkId, address, account }: ERC20BalanceId): [string, string, string] {
    return [networkId, address.toLowerCase(), account.toLowerCase()];
}

/** @internal */
export function validateERC20Balance(item: ERC20Balance): ERC20Balance {
    const item2: ERC20Balance = {
        ...item,
        ...validateIdERC20Balance(item),
    };
    return omitBy(item2, isUndefined) as ERC20Balance;
}
