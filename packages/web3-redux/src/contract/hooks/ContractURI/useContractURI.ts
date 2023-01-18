import * as Contracts from '@owlprotocol/contracts';
import { contractCallHookFactory } from '../useContractCall.js';

export const useContractURI = contractCallHookFactory<Contracts.Web3.IContractURI, 'contractURI'>(
    'contractURI',
    { abi: Contracts.Artifacts.IContractURI.abi }
);
