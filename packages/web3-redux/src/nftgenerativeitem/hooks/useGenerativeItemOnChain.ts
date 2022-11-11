import { useMemo } from 'react';
import { useERC721DnaGetDna } from '../../contract/hooks/ERC721Dna/useERC721DnaGetDna.js';
import { useERC721TopDownChildTokenIdsOf } from '../../contract/hooks/index.js';
import { useGenerativeCollection } from '../../nftgenerativecollection/hooks/useGenerativeCollection.js';

export const useGenerativeItemOnchain = (
    networkId: string | undefined,
    address: string | undefined,
    tokenId: number | undefined,
) => {
    const [collection] = useGenerativeCollection(networkId, address, 'onchain')

    const [fullDna] = useERC721DnaGetDna(networkId, address, [tokenId])
    const [childTokenIds] = useERC721TopDownChildTokenIdsOf(networkId, address, [tokenId])
    const item = useMemo(() => {
        if (collection && fullDna) return collection.createFromFullDna(fullDna);
    }, [collection, fullDna]);

    const result = { fullDna, childTokenIds, item }
    return [result] as [typeof result];
};

