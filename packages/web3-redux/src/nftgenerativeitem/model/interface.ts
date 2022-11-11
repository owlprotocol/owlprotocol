/** Id components for NFTGenerativeItem */
export interface NFTGenerativeItemId {
    /** See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Contract Address */
    readonly address: string;
    /** Token id */
    readonly tokenId: number;
    readonly status: 'onchain' | 'draft';
}

export interface NFTGenerativeItem extends NFTGenerativeItemId {
    /** Encoded definition of collection */
    readonly fullDna?: string;
    readonly inherentDna?: string;
    readonly childDna?: string[];
    readonly childTokenIds?: string[];
}

export type NFTGenerativeItemIndexInput = NFTGenerativeItemId | { networkId: string; status: 'onchain' | 'draft' };
export const NFTGenerativeItemIndex = '[networkId+address+tokenId+status], [networkId+status]';

/** @internal */
export function validateId({ networkId, address, tokenId, status }: NFTGenerativeItemId) {
    return { networkId, address: address.toLowerCase(), tokenId, status };
}

export function toPrimaryKey({
    networkId,
    address,
    tokenId,
    status,
}: NFTGenerativeItemId): [string, string, number, string] {
    return [networkId, address.toLowerCase(), tokenId, status];
}

/** @internal */
export function validate(item: NFTGenerativeItem): NFTGenerativeItem {
    return { ...item, address: item.address.toLowerCase() };
}
