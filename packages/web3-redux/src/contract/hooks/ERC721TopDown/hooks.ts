import * as Contracts from '@owlprotocol/contracts';
import { contractCallHookFactory } from '../useContractCall.js';

const IContractURI = Contracts.Artifacts.IContractURI.abi;
const IERC721 = Contracts.Artifacts.IERC721.abi;
const IERC721Metadata = Contracts.Artifacts.IERC721Metadata.abi;
const IERC721TopDown = Contracts.Artifacts.IERC721TopDown.abi;
const IERC721Dna = Contracts.Artifacts.IERC721Dna.abi;
const abi = [...IContractURI, ...IERC721, ...IERC721Metadata, ...IERC721TopDown, ...IERC721Dna];

export const useERC721TopDownGetChildContracts = contractCallHookFactory<Contracts.Web3.IERC721TopDown, 'getChildContracts'>(
    'getChildContracts',
    { abi },
    1000,
);

export const useERC721TopDownChildTokenIdOf = contractCallHookFactory<Contracts.Web3.IERC721TopDown, 'childTokenIdOf721'>(
    'childTokenIdOf721',
    { abi },
    1000,
);

export const useERC721TopDownChildTokenIdsOf = contractCallHookFactory<Contracts.Web3.IERC721TopDown, 'childTokenIdsOf'>(
    'childTokenIdsOf',
    { abi }
);


export const useERC721TopDownParentTokenIdOf = contractCallHookFactory<Contracts.Web3.IERC721TopDown, 'parentTokenIdOf'>(
    'parentTokenIdOf',
    { abi },
    1000,
);

export const useERC721TopDownRootOwnerOf = contractCallHookFactory<Contracts.Web3.IERC721TopDown, 'rootOwnerOf'>(
    'rootOwnerOf',
    { abi },
    1000,
);
