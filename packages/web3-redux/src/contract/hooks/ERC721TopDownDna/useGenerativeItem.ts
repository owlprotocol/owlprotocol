import { NFTGenerativeCollectionInterface } from '@owlprotocol/nft-sdk';
import { useMemo } from 'react';
import { useERC721DnaGetDna } from '../ERC721Dna/useERC721DnaGetDna.js';

export const useGenerativeItem = (
    collection: NFTGenerativeCollectionInterface | undefined,
    networkId: string | undefined,
    address: string | undefined,
    tokenId: number | undefined,
) => {
    const [fullDna] = useERC721DnaGetDna(networkId, address, [tokenId]);
    const item = useMemo(() => {
        if (collection && fullDna) return collection.createFromFullDna(fullDna);
    }, [collection, fullDna]);

    return [item];
};
