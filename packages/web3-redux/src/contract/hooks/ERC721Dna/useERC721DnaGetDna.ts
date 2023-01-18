import * as Contracts from '@owlprotocol/contracts';
import { contractCallHookFactory } from '../useContractCall.js';

export const useERC721DnaGetDna = contractCallHookFactory<Contracts.Web3.IERC721Dna, 'getDna'>(
    'getDna',
    { abi: Contracts.Artifacts.IERC721Dna.abi },
    1000
);
