import { isUndefined, omitBy } from "lodash-es";

/** ERC721 id components */
export interface ERC721Id {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly tokenId: string;
}

export interface ERC721Metadata {
    readonly name?: string;
    readonly image?: string;
    [k: string]: any;
}
export interface ERC721 extends ERC721Id {
    readonly owner?: string;
    readonly approved?: string;
    readonly name?: string;
    readonly totalSupply?: string;
    readonly tokenURI?: string;
    readonly metadata?: ERC721Metadata;
    //Client-side computed
    readonly dna?: string;
    readonly dnaMetadata?: ERC721Metadata;
}

/** @internal */
export function validateIdERC721({ networkId, address, tokenId }: ERC721Id): ERC721Id {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        tokenId,
    };
}

export function toPrimaryKeyERC721({ networkId, address, tokenId }: ERC721Id): [string, string, string] {
    return [networkId, address.toLowerCase(), tokenId];
}

/** @internal */
export function validateERC721(item: ERC721): ERC721 {
    const item2: ERC721 = {
        ...item,
        ...validateIdERC721(item),
        owner: item.owner?.toLowerCase(),
    };
    return omitBy(item2, isUndefined) as ERC721;
}
