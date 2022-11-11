import { Web3, Artifacts } from '@owlprotocol/contracts';
import { contractCallHookFactory } from '../useContractCall.js';

export const useContractURI = contractCallHookFactory<Web3.IContractURI, 'contractURI'>(
    'contractURI',
    { abi: Artifacts.IContractURI.abi }
);
