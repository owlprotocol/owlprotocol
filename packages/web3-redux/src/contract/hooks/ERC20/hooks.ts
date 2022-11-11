import { Artifacts, Web3 } from '@owlprotocol/contracts';
import { createEventSync } from '../../../sync/model/EventSync.js';
import { contractCallHookFactory } from '../useContractCall.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000'
const IContractURI = Artifacts.IContractURI.abi;
const IERC20 = Artifacts.IERC20.abi;
const IERC20Metadata = Artifacts.IERC20Metadata.abi;
const abi = [...IContractURI, ...IERC20, ...IERC20Metadata];

export const useERC20Name = contractCallHookFactory<Web3.IERC20Metadata, 'name'>(
    'name',
    { abi },
    Number.MAX_SAFE_INTEGER,
);

export const useERC20Symbol = contractCallHookFactory<Web3.IERC20Metadata, 'symbol'>(
    'symbol',
    { abi },
    Number.MAX_SAFE_INTEGER,
);

export const useERC20Decimals = contractCallHookFactory<Web3.IERC20Metadata, 'decimals'>(
    'decimals',
    { abi },
    Number.MAX_SAFE_INTEGER,
);

export const useERC20TotalSupply = contractCallHookFactory<Web3.IERC20Metadata, 'totalSupply'>(
    'totalSupply',
    { abi },
    1000,
    (networkId, address, []) => {
        return createEventSync('', networkId, [], address, 'Transfer', [{ from: ADDRESS_0 }, { to: ADDRESS_0 }])
    }
);

export const useERC20BalanceOf = contractCallHookFactory<Web3.IERC20Metadata, 'balanceOf'>(
    'balanceOf',
    { abi },
    1000,
    (networkId, address, [account]) => {
        return createEventSync('', networkId, [], address, 'Transfer', [{ from: account }, { to: account }])
    }
);

export const useERC20Allowance = contractCallHookFactory<Web3.IERC20Metadata, 'allowance'>(
    'allowance',
    { abi },
    1000,
    (networkId, address, [owner, spender]) => {
        return createEventSync('', networkId, [], address, 'Approval', [{ owner, spender }])
    }
);

