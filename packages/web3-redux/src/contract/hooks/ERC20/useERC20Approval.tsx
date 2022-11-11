import { Web3 } from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC20Approval = contractEventsHookFactory<
    Web3.IERC20,
    'Approval',
    Web3.IERC20ApprovalEvent['returnValues']
>('Approval');
export default useERC20Approval;
