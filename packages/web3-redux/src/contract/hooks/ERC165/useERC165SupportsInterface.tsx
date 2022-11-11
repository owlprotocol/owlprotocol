import { Artifacts, Web3 } from '@owlprotocol/contracts';
import { contractCallHookFactory } from '../useContractCall.js';

export const useERC165SupportsInterface = contractCallHookFactory<Web3.IERC165, 'supportsInterface'>(
    'supportsInterface',
    { abi: Artifacts.IERC165.abi }
);
