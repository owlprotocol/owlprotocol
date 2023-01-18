import * as Contracts from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC20Transfer = contractEventsHookFactory<Contracts.Web3.IERC20, 'Transfer', Contracts.Web3.IERC20TransferEvent['returnValues']>('Transfer');
export default useERC20Transfer;
