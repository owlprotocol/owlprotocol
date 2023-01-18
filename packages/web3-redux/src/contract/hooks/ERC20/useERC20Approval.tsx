import * as Contracts from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC20Approval = contractEventsHookFactory<
    Contracts.Web3.IERC20,
    'Approval',
    Contracts.Web3.IERC20ApprovalEvent['returnValues']
>('Approval');
export default useERC20Approval;
