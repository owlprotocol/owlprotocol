import type { ERC20Mintable } from '../ethers/types.js';

export interface ERC20MintableInitializeArgs {
    admin: Parameters<ERC20Mintable['initialize']>[0];
    contractUri: Parameters<ERC20Mintable['initialize']>[1];
    gsnForwarder: Parameters<ERC20Mintable['initialize']>[2];
    name: Parameters<ERC20Mintable['initialize']>[3];
    symbol: Parameters<ERC20Mintable['initialize']>[4];
}

export function flattenInitArgsERC20Mintable(args: ERC20MintableInitializeArgs) {
    const { admin, contractUri, gsnForwarder, name, symbol } = args;
    return [admin, contractUri, gsnForwarder, name, symbol] as Parameters<ERC20Mintable['initialize']>;
}
