import * as Contracts from '@owlprotocol/contracts';
import { createEventSync } from '../../../sync/model/EventSync.js';
import { contractCallHookFactory } from '../useContractCall.js';

const IContractURI = Contracts.Artifacts.IContractURI.abi;
const IERC721 = Contracts.Artifacts.IERC721.abi;
const IERC721Metadata = Contracts.Artifacts.IERC721Metadata.abi;
const IERC721TopDown = Contracts.Artifacts.IERC721TopDown.abi;
const IERC721Dna = Contracts.Artifacts.IERC721Dna.abi;
const abi = [...IContractURI, ...IERC721, ...IERC721Metadata, ...IERC721TopDown, ...IERC721Dna];

export const useERC721Name = contractCallHookFactory<Contracts.Web3.IERC721Metadata, 'name'>(
    'name',
    { abi },
    Number.MAX_SAFE_INTEGER,
);

export const useERC721Symbol = contractCallHookFactory<Contracts.Web3.IERC721Metadata, 'symbol'>(
    'symbol',
    { abi },
    Number.MAX_SAFE_INTEGER,
);

export const useERC721TokenURI = contractCallHookFactory<Contracts.Web3.IERC721Metadata, 'tokenURI'>(
    'tokenURI',
    { abi: Contracts.Artifacts.IERC721Metadata.abi },
    Number.MAX_SAFE_INTEGER
);

export const useERC721TotalSupply = contractCallHookFactory<Contracts.Web3.IERC721Enumerable, 'totalSupply'>(
    'totalSupply',
    { abi: Contracts.Artifacts.IERC721Enumerable.abi },
    0
);

export const useERC721OwnerOf = contractCallHookFactory<Contracts.Web3.IERC721, 'ownerOf'>(
    'ownerOf',
    { abi },
    1000,
    (networkId, address, [tokenId]) => {
        if (tokenId) return createEventSync('', networkId, [], address, 'Transfer', [{ tokenId }])
    }
);

export const useERC721GetApproved = contractCallHookFactory<Contracts.Web3.IERC721, 'getApproved'>(
    'getApproved',
    { abi: Contracts.Artifacts.IERC20.abi },
    1000,
    (networkId, address, [tokenId]) => {
        if (tokenId) return createEventSync('', networkId, [], address, 'Approval', [{ tokenId }])
    }
);

export const useERC721IsApprovedForAll = contractCallHookFactory<Contracts.Web3.IERC721, 'isApprovedForAll'>(
    'isApprovedForAll',
    { abi: Contracts.Artifacts.IERC721.abi },
    1000,
    (networkId, address, [owner, operator]) => {
        if (owner && operator) return createEventSync('', networkId, [], address,
            'ApprovalForAll',
            [{ owner, operator }]
        )
    }
);
