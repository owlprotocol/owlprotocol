import { Artifacts, Web3 } from '@owlprotocol/contracts';
import { contractCallHookFactory } from '../useContractCall.js';

const IContractURI = Artifacts.IContractURI.abi;
const IERC721 = Artifacts.IERC721.abi;
const IERC721Metadata = Artifacts.IERC721Metadata.abi;
const IERC721TopDown = Artifacts.IERC721TopDown.abi;
const IERC721Dna = Artifacts.IERC721Dna.abi;
const abi = [...IContractURI, ...IERC721, ...IERC721Metadata, ...IERC721TopDown, ...IERC721Dna];

export const useERC721TopDownGetChildContracts = contractCallHookFactory<Web3.IERC721TopDown, 'getChildContracts'>(
    'getChildContracts',
    { abi },
    1000,
);

export const useERC721TopDownChildTokenIdOf = contractCallHookFactory<Web3.IERC721TopDown, 'childTokenIdOf'>(
    'childTokenIdOf',
    { abi },
    1000,
);

export const useERC721TopDownChildTokenIdsOf = contractCallHookFactory<Web3.IERC721TopDown, 'childTokenIdsOf'>(
    'childTokenIdsOf',
    { abi }
);


export const useERC721TopDownParentTokenIdOf = contractCallHookFactory<Web3.IERC721TopDown, 'parentTokenIdOf'>(
    'parentTokenIdOf',
    { abi },
    1000,
);

export const useERC721TopDownRootOwnerOf = contractCallHookFactory<Web3.IERC721TopDown, 'rootOwnerOf'>(
    'rootOwnerOf',
    { abi },
    1000,
);
