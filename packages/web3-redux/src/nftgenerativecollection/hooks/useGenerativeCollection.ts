import { useMemo } from 'react';
import { NFTGenerativeCollectionClass } from '@owlprotocol/nft-sdk';
import { NFTGenerativeCollectionCRUD } from '../crud.js';

export const useGenerativeCollection = (networkId: string | undefined, address: string | undefined, status: 'onchain' | 'draft' | undefined) => {
    const [item, options] = NFTGenerativeCollectionCRUD.hooks.useFetch({ networkId, address, status });
    const metadata = item?.metadata
    const metadataHash = JSON.stringify(metadata)
    const collection = useMemo(() => {
        if (metadata) {
            return NFTGenerativeCollectionClass.fromData(metadata);
        }
    }, [metadataHash]);

    return [collection, options] as [typeof collection, typeof options];
};
