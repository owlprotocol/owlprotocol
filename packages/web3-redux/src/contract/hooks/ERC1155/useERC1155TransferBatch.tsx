import { Web3 } from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC1155TransferBatch = contractEventsHookFactory<
    Web3.IERC1155,
    'TransferBatch',
    Web3.IERC1155TransferBatchEvent['returnValues']
>('TransferBatch');
export default useERC1155TransferBatch;
