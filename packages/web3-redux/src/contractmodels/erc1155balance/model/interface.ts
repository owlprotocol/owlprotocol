import { isUndefined, omitBy } from "lodash-es";

/** ERC1155Balance id components */
export interface ERC1155BalanceId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly id: string;
    readonly account: string;
}

export interface ERC1155Balance extends ERC1155BalanceId {
    readonly balance?: string;
}

//Valid indexes
export type ERC1155BalanceIndexInput =
    | ERC1155BalanceId
    //Indices
    | { networkId: string; address: string; id: string }
    | { networkId: string; address: string }
    | { networkId: string }
    | { networkId: string; account: string }
    | { account: string };

export type ERC1155BalanceIndexInputAnyOf =
    | {
          networkId: string[] | string;
          address: string[] | string;
          id: string[] | string;
          account: string[] | string;
      }
    | {
          networkId: string[] | string;
          address: string[] | string;
          id: string[] | string;
      }
    | { networkId: string[] | string; address: string[] | string }
    | { networkId: string[] | string; account: string[] | string }
    | { networkId: string[] | string }
    | { account: string[] | string };

export const ERC1155BalanceIndex =
    "[networkId+address+id+account],[networkId+address+account],[networkId+account],account";

/** @internal */
export function validateId({ networkId, address, id, account }: ERC1155BalanceId): ERC1155BalanceId {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        id,
        account: account.toLowerCase(),
    };
}

export function toPrimaryKey({ networkId, address, id, account }: ERC1155BalanceId): [string, string, string, string] {
    return [networkId, address.toLowerCase(), id, account.toLowerCase()];
}

/** @internal */
export function validate(item: ERC1155Balance): ERC1155Balance {
    const item2: ERC1155Balance = {
        ...item,
        ...validateId(item),
    };
    return omitBy(item2, isUndefined) as ERC1155Balance;
}
