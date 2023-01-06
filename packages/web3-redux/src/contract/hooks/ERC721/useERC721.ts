import { useMemo } from 'react';
import { Artifacts, Web3 } from '@owlprotocol/contracts';
import { useERC721Name, useERC721OwnerOf, useERC721Symbol, useERC721TokenURI } from './hooks.js';
import { useERC721Transfer } from './useERC721Transfer.js';
import { useERC721Approval } from './useERC721Approval.js';
import { UseEventsOptions } from '../useEvents.js';
import { useURI } from '../../../ipfs/hooks/useURI.js';
import { useContract } from '../useContract.js';

/**
 * Contract hook for ERC721 interface.
 * Will automatically set ABI if not set already.
 * @category Hooks
 *
 */
export function useERC721(
    networkId: string | undefined,
    address: string | undefined,
    tokenId: string | undefined,
    sync?: {
        metadata?: boolean;
        TransferEventsOptions?: UseEventsOptions;
        ApprovalEventsOptions?: UseEventsOptions;
    },
) {
    //Create abi in store if non-existant
    useContract(networkId, address, { abi: Artifacts.IERC721Metadata.abi });
    //Static values
    const [name] = useERC721Name(networkId, address);
    const [symbol] = useERC721Symbol(networkId, address)
    //if ownerOf is 'Transfer' we disable hook sync and dispatch our own custom solution
    const [ownerOf] = useERC721OwnerOf(networkId, address, [tokenId])
    const [tokenURI] = useERC721TokenURI(networkId, address, [tokenId]);
    const [metadata, { contentId }] = useURI(sync?.metadata ? tokenURI : undefined);

    //Events
    const TransferEventsOptions = sync?.TransferEventsOptions ?? { sync: false, past: false }; //Sync token Transfer events, default just reads data
    const ApprovalEventsOptions = sync?.ApprovalEventsOptions ?? { sync: false, past: false }; //Sync token Approval events, default just reads data
    const [Transfer] = useERC721Transfer(networkId, address, { tokenId }, TransferEventsOptions);
    const [Approval] = useERC721Approval(networkId, address, { tokenId }, ApprovalEventsOptions);

    //IPFS
    //TODO: Use tokenURI to fetch NFT metadata
    const values = useMemo(() => {
        return {
            name,
            symbol,
            ownerOf,
            tokenURI,
            metadata,
            contentId,
            Transfer,
            Approval,
        };
    }, [name, symbol, ownerOf, tokenURI, Transfer, Approval, metadata, contentId]);

    return values;
}

/**
 * Alias for useERC721.
 * @category Hooks
 *
 */
export const useNFT = useERC721;

export default useERC721;
