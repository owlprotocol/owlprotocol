import { Web3 } from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC721Approval = contractEventsHookFactory<Web3.IERC721, 'Approval', Web3.IERC721ApprovalEvent['returnValues']>('Approval');
export default useERC721Approval;
