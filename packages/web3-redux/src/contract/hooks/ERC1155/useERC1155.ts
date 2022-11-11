import { useMemo } from 'react';
import invariant from 'tiny-invariant';
import { Artifacts } from '@owlprotocol/contracts';
import { useERC1155TransferSingle } from './useERC1155TransferSingle.js';
import { useERC1155TokenURI, useERC1155BalanceOf } from './hooks.js';
import { UseEventsOptions } from '../useEvents.js';
import { isAddress } from '../../../utils/web3-utils/index.js';

import { GenericSync } from '../../../sync/model/index.js';
import { createEventSync } from '../../../sync/model/EventSync.js';
import { useURI } from '../../../ipfs/hooks/useURI.js';
import { useContract } from '../useContract.js';

/**
 * Contract hook for ERC1155 interface.
 * Will automatically set ABI if not set already.
 * @category Hooks
 *
 */
export function useERC1155(
    networkId: string | undefined,
    address: string | undefined,
    balanceOfAddress: string | undefined,
    balanceOfTokenId: string | undefined,
    sync?: {
        metadata?: boolean;
        TransferEventsOptions?: UseEventsOptions;
    },
) {
    //Create abi in store if non-existant
    useContract(networkId, address, { abi: Artifacts.IERC1155MetadataURI.abi });
    if (address) invariant(isAddress(address), `${address} invalid contract address!`);
    if (balanceOfAddress) invariant(isAddress(balanceOfAddress), `${balanceOfAddress} invalid balanceOf address!`);

    //Default sync params
    //const totalSupplySync = sync?.totalSupply ?? 'ifnull'; //Some tokens might have dynamic supply
    //Refresh call action will get set by the callSyncedAction() creator, we pass an empty array as an argument
    //We also disable sync if networkId/address undefined to avoid unpredictable behaviour

    //Static values
    //const totalSupply = useContractCall(networkId, address, 'totalSupply', [balanceOfTokenId], { sync: totalSupplySync });
    const [uri] = useERC1155TokenURI(networkId, address, [balanceOfTokenId]);
    const uriParsed = uri && balanceOfTokenId ? uri.replace('{id}', balanceOfTokenId) : undefined;
    const [metadata, { contentId }] = useURI(sync?.metadata ? uriParsed : undefined);

    //if balanceOf is 'Transfer' we disable hook sync and dispatch our own custom solution
    const [balanceOf] = useERC1155BalanceOf(networkId, address, [balanceOfAddress, balanceOfTokenId])    //Events

    const TransferEventsOptions = sync?.TransferEventsOptions ?? { sync: false, past: false }; //Sync token Transfer events, default just reads data

    const [TransferFrom] = useERC1155TransferSingle(
        networkId,
        address,
        { from: balanceOfAddress, id: balanceOfTokenId },
        TransferEventsOptions,
    );
    const [TransferTo] = useERC1155TransferSingle(
        networkId,
        address,
        { to: balanceOfAddress, id: balanceOfTokenId },
        TransferEventsOptions,
    );

    const values = useMemo(() => {
        return {
            //totalSupply,
            uri: uriParsed,
            balanceOf,
            metadata,
            contentId,
            TransferFrom,
            TransferTo,
        };
    }, [, uriParsed, balanceOf, metadata, contentId, TransferFrom, TransferTo]);

    return values;
}

/**
 * Alias for
 * @category Hooks
 *
 */
export const useMultiToken = useERC1155;

export default useERC1155;
