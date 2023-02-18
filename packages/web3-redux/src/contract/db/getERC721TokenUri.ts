import * as Contracts from '@owlprotocol/contracts';
import { getContractCall } from './getContractCall.js';

/**
 * Recursively searches for CID at file at <BASE_CID>/path/to/file
 */
export async function getERC721TokenUri(
    state: any,
    networkId: string | undefined,
    address: string | undefined,
    tokenId: number | undefined,
) {
    if (!tokenId) return undefined;

    const returnValue = await getContractCall<Contracts.Web3.IERC721Metadata, 'tokenURI'>(state, networkId, address, 'tokenURI', [
        tokenId,
    ]);

    //TODO: Manual override to locally generate uri
    return returnValue;
}

export default getERC721TokenUri;
