import * as Contracts from '@owlprotocol/contracts';
import { contractCallHookFactory } from '../useContractCall.js';

export const useERC165SupportsInterface = contractCallHookFactory<Contracts.Web3.IERC165, 'supportsInterface'>(
    'supportsInterface',
    { abi: Contracts.Artifacts.IERC165.abi }
);
