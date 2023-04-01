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

//Valid indexes
export type ERC20BalanceIndexInput =
    | ERC20BalanceId
    //Indices
    | { networkId: string; account: string }
    | { networkId: string }
    | { account: string };

export type ERC20BalanceIndexInputAnyOf =
    | {
          networkId: string[] | string;
          address: string[] | string;
          account: string[] | string;
      }
    | { networkId: string[] | string; account: string | string[] }
    | { networkId: string[] | string }
    | { account: string | string[] };

export const ERC20BalanceIndex = "[networkId+address+account],[networkId+account],account";

/** @internal */
export function validateId({ networkId, address, account }: ERC20BalanceId): ERC20BalanceId {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        account: account.toLowerCase(),
    };
}

export function toPrimaryKey({ networkId, address, account }: ERC20BalanceId): [string, string, string] {
    return [networkId, address.toLowerCase(), account.toLowerCase()];
}

/** @internal */
export function validate(item: ERC20Balance): ERC20Balance {
    const item2: ERC20Balance = {
        ...item,
        ...validateId(item),
    };
    return omitBy(item2, isUndefined) as ERC20Balance;
}
