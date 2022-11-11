import type {
    NFTGenerativeCollection as NFTGenerativeCollectionSpec,
} from '@owlprotocol/nft-sdk';
import { isUndefined, omit, omitBy } from 'lodash-es';
import { toReduxOrmId } from '../../utils/toReduxORMId.js';
/** Id components for NFTGenerativeCollection */
export interface NFTGenerativeCollectionId {
    /** See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Contract Address */
    readonly address: string;
    readonly status: 'onchain' | 'draft';
}

export interface NFTGenerativeCollection extends NFTGenerativeCollectionId {
    /** Encoded definition of collection */
    readonly metadata: NFTGenerativeCollectionSpec;
    readonly childContracts?: string[];
}

export type NFTGenerativeCollectionIndexInput =
    | NFTGenerativeCollectionId
    | { networkId: string; status: 'onchain' | 'draft' };
export const NFTGenerativeCollectionIndex = '[networkId+address+status], [networkId+status]';

/** @internal */
export function validateId({ networkId, address, status }: NFTGenerativeCollectionId) {
    return { networkId, address: address.toLowerCase(), status };
}

export function toPrimaryKey({ networkId, address, status }: NFTGenerativeCollectionId): [string, string, string] {
    return [networkId, address.toLowerCase(), status];
}

/** @internal */
export function validate(item: NFTGenerativeCollection): NFTGenerativeCollection {
    const { networkId, address, status } = item;
    return omitBy(
        {
            ...item,
            address: address.toLowerCase(),
            id: toReduxOrmId(toPrimaryKey({ networkId, address, status })),
        },
        isUndefined,
    ) as unknown as NFTGenerativeCollection;
}
