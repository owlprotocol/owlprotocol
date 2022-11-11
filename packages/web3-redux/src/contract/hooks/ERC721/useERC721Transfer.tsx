import { Web3 } from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC721Transfer = contractEventsHookFactory<Web3.IERC721, 'Transfer', Web3.IERC721TransferEvent['returnValues']>('Transfer');
export default useERC721Transfer;
