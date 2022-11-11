import { useMemo } from 'react';
import { NFTGenerativeCollectionClass } from '@owlprotocol/nft-sdk';
import { useContractURI } from '../ContractURI/useContractURI.js';
import { useURI } from '../../../ipfs/hooks/useURI.js';

export const useGenerativeCollection = (networkId: string | undefined, address: string | undefined) => {
    const [uri] = useContractURI(networkId, address);

    //If uri query uri
    const [metadata] = useURI(uri);

    //Create collection
    const collection = useMemo(() => {
        if (metadata) {
            return NFTGenerativeCollectionClass.fromData(metadata);
        }
    }, [metadata]);

    return [collection];
};
