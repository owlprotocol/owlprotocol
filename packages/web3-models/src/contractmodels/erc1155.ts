import { isUndefined, omitBy } from "lodash-es";

/** ERC1155 id components */
export interface ERC1155Id {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    readonly address: string;
    readonly id: string;
}
export interface ERC1155Metadata {
    readonly name?: string;
    readonly image?: string;
    [k: string]: any;
}

export interface ERC1155 extends ERC1155Id {
    readonly name?: string;
    readonly totalSupply?: string;
    readonly uri?: string;
    readonly metadata?: ERC1155Metadata;
    readonly dna?: string;
    //Client-side computed
    readonly dnaMetadata?: ERC1155Metadata;
}

/** @internal */
export function validateIdERC1155({ networkId, address, id }: ERC1155Id): ERC1155Id {
    return {
        networkId: networkId,
        address: address.toLowerCase(),
        id,
    };
}

export function toPrimaryKeyERC1155({ networkId, address, id }: ERC1155Id): [string, string, string] {
    return [networkId, address.toLowerCase(), id];
}

/** @internal */
export function validateERC1155(item: ERC1155): ERC1155 {
    const item2: ERC1155 = {
        ...item,
        ...validateIdERC1155(item),
    };
    return omitBy(item2, isUndefined) as ERC1155;
}
