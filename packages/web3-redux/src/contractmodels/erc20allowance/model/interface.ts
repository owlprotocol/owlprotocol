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

//Valid indexes
export type ERC20AllowanceIndexInput =
    | ERC20AllowanceId
    //Indices
    | { networkId: string; account: string; spender: string }
    | { networkId: string; account: string }
    | { networkId: string }
    | { account: string };

export type ERC20AllowanceIndexInputAnyOf =
    | {
          networkId: string[] | string;
          address: string[] | string;
          account: string[] | string;
          spender: string[] | string;
      }
    | {
          networkId: string[] | string;
          address: string[] | string;
          account: string | string[];
      }
    | { networkId: string[] | string; account: string | string[] }
    | { networkId: string[] | string }
    | { account: string | string[] };

export const ERC20AllowanceIndex = "[networkId+address+account],[networkId+account],account";

/** @internal */
export function validateId({ networkId, address, account, spender }: ERC20AllowanceId): ERC20AllowanceId {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        account: account.toLowerCase(),
        spender: spender.toLowerCase(),
    };
}

export function toPrimaryKey({
    networkId,
    address,
    account,
    spender,
}: ERC20AllowanceId): [string, string, string, string] {
    return [networkId, address.toLowerCase(), account.toLowerCase(), spender.toLowerCase()];
}

/** @internal */
export function validate(item: ERC20Allowance): ERC20Allowance {
    const item2: ERC20Allowance = {
        ...item,
        ...validateId(item),
    };
    return omitBy(item2, isUndefined) as ERC20Allowance;
}
