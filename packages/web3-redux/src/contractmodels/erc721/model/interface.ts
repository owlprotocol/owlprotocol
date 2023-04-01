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

//Valid indexes
export type ERC721IndexInput =
    | ERC721Id
    //Indices
    | { networkId: string; address: string }
    | { networkId: string; owner: string }
    | { networkId: string }
    | { owner: string };

export type ERC721IndexInputAnyOf =
    | { networkId: string[] | string; address: string[] | string; tokenId: string[] | string }
    | { networkId: string[] | string; address: string[] | string }
    | { networkId: string[] | string; owner: string[] | string }
    | { networkId: string[] | string }
    | { owner: string[] | string };

export const ERC721Index = "[networkId+address+tokenId],[networkId+address],[networkId+owner],owner,tokenURI";

/** @internal */
export function validateId({ networkId, address, tokenId }: ERC721Id): ERC721Id {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        tokenId,
    };
}

export function toPrimaryKey({ networkId, address, tokenId }: ERC721Id): [string, string, string] {
    return [networkId, address.toLowerCase(), tokenId];
}

/** @internal */
export function validate(item: ERC721): ERC721 {
    const item2: ERC721 = {
        ...item,
        ...validateId(item),
        owner: item.owner?.toLowerCase(),
    };
    return omitBy(item2, isUndefined) as ERC721;
}
