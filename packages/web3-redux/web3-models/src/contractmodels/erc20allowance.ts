import { isUndefined, omitBy } from "lodash-es";

/** ERC20Allowance id components */
export interface ERC20AllowanceId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly account: string;
    readonly spender: string;
}

export interface ERC20Allowance extends ERC20AllowanceId {
    readonly balance?: string;
}

/** @internal */
export function validateIdERC20Allowance({ networkId, address, account, spender }: ERC20AllowanceId): ERC20AllowanceId {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        account: account.toLowerCase(),
        spender: spender.toLowerCase(),
    };
}

export function toPrimaryKeyERC20Allowance({
    networkId,
    address,
    account,
    spender,
}: ERC20AllowanceId): [string, string, string, string] {
    return [networkId, address.toLowerCase(), account.toLowerCase(), spender.toLowerCase()];
}

/** @internal */
export function validateERC20Allowance(item: ERC20Allowance): ERC20Allowance {
    const item2: ERC20Allowance = {
        ...item,
        ...validateIdERC20Allowance(item),
    };
    return omitBy(item2, isUndefined) as ERC20Allowance;
}
