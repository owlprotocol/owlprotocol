import { Artifacts, Web3 } from '@owlprotocol/contracts';
import { contractCallHookFactory } from '../useContractCall.js';

export const useERC721DnaGetDna = contractCallHookFactory<Web3.IERC721Dna, 'getDna'>(
    'getDna',
    { abi: Artifacts.IERC721Dna.abi },
    1000
);
