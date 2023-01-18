import * as Contracts from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC721Transfer = contractEventsHookFactory<Contracts.Web3.IERC721, 'Transfer', Contracts.Web3.IERC721TransferEvent['returnValues']>('Transfer');
export default useERC721Transfer;
