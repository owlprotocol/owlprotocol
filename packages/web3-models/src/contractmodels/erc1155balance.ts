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

/** @internal */
export function validateIdERC1155Balance({ networkId, address, id, account }: ERC1155BalanceId): ERC1155BalanceId {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        id,
        account: account.toLowerCase(),
    };
}

export function toPrimaryKeyERC1155Balance({
    networkId,
    address,
    id,
    account,
}: ERC1155BalanceId): [string, string, string, string] {
    return [networkId, address.toLowerCase(), id, account.toLowerCase()];
}

/** @internal */
export function validateERC1155Balance(item: ERC1155Balance): ERC1155Balance {
    const item2: ERC1155Balance = {
        ...item,
        ...validateIdERC1155Balance(item),
    };
    return omitBy(item2, isUndefined) as ERC1155Balance;
}
