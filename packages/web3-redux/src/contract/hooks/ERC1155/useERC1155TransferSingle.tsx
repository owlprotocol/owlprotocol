import * as Contracts from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC1155TransferSingle = contractEventsHookFactory<
    Contracts.Web3.IERC1155,
    'TransferSingle',
    Contracts.Web3.IERC1155TransferSingleEvent['returnValues']
>('TransferSingle');
export default useERC1155TransferSingle;
