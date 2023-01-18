import * as Contracts from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC721Approval = contractEventsHookFactory<Contracts.Web3.IERC721, 'Approval', Contracts.Web3.IERC721ApprovalEvent['returnValues']>('Approval');
export default useERC721Approval;
