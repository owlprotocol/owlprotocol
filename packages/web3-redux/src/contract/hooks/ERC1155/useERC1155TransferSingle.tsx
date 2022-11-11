import { Web3 } from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC1155TransferSingle = contractEventsHookFactory<
    Web3.IERC1155,
    'TransferSingle',
    Web3.IERC1155TransferSingleEvent['returnValues']
>('TransferSingle');
export default useERC1155TransferSingle;
