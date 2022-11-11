import { useMemo } from 'react';
import { useGenerativeCollection } from '../../nftgenerativecollection/hooks/useGenerativeCollection.js';
import { NFTGenerativeItemCRUD } from '../crud.js';

export const useGenerativeItemLocal = (
    networkId: string | undefined,
    address: string | undefined,
    tokenId: number | undefined,
) => {
    const [collection] = useGenerativeCollection(networkId, address, 'onchain')
    const [nft, options] = NFTGenerativeItemCRUD.hooks.useFetch({ networkId, address, tokenId, status: 'draft' as const })
    const fullDna = nft?.fullDna;
    const childTokenIds = nft?.childTokenIds
    const item = useMemo(() => {
        if (collection && fullDna) return collection.createFromFullDna(fullDna);
    }, [collection, fullDna]);

    const result = { fullDna, childTokenIds, item }
    return [result] as [typeof result];
};
