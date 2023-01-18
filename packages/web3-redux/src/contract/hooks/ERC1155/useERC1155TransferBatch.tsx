import * as Contracts from '@owlprotocol/contracts';
import { contractEventsHookFactory } from '../useEvents.js';

export const useERC1155TransferBatch = contractEventsHookFactory<
    Contracts.Web3.IERC1155,
    'TransferBatch',
    Contracts.Web3.IERC1155TransferBatchEvent['returnValues']
>('TransferBatch');
export default useERC1155TransferBatch;
