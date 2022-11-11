import { Artifacts, Web3 } from '@owlprotocol/contracts';
import { createEventSync } from '../../../sync/model/EventSync.js';
import { contractCallHookFactory } from '../useContractCall.js';

const IContractURI = Artifacts.IContractURI.abi;
const IERC1155 = Artifacts.IERC1155.abi;
const IERC1155MetadataURI = Artifacts.IERC1155MetadataURI.abi;
const abi = [...IContractURI, ...IERC1155, ...IERC1155MetadataURI];

export const useERC1155TokenURI = contractCallHookFactory<Web3.IERC1155MetadataURI, 'uri'>(
    'uri',
    { abi: Artifacts.IERC1155MetadataURI.abi },
    Number.MAX_SAFE_INTEGER
);

export const useERC1155BalanceOf = contractCallHookFactory<Web3.IERC1155, 'balanceOf'>(
    'balanceOf',
    { abi: Artifacts.IERC1155.abi },
    1000,
    (networkId, address, [account, id]) => {
        if (account && id) {
            return createEventSync('', networkId, [], address,
                'TransferSingle', [{ from: account, id }, { to: account, id }])
        }
    }
);
