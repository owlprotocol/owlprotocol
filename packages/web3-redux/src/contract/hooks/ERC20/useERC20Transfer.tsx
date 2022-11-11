import { Web3 } from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC20Transfer = contractEventsHookFactory<Web3.IERC20, 'Transfer', Web3.IERC20TransferEvent['returnValues']>('Transfer');
export default useERC20Transfer;
