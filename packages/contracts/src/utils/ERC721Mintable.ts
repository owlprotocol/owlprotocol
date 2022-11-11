import type { ERC721Mintable } from '../ethers/types.js';

export interface ERC721MintableInitializeArgs {
    admin: Parameters<ERC721Mintable['initialize']>[0];
    contractUri: Parameters<ERC721Mintable['initialize']>[1];
    gsnForwarder: Parameters<ERC721Mintable['initialize']>[2];
    name: Parameters<ERC721Mintable['initialize']>[3];
    symbol: Parameters<ERC721Mintable['initialize']>[4];
    initBaseURI: Parameters<ERC721Mintable['initialize']>[5];
    feeReceiver: Parameters<ERC721Mintable['initialize']>[6];
    feeNumerator: Parameters<ERC721Mintable['initialize']>[7];
}

export function flattenInitArgsERC721Mintable(args: ERC721MintableInitializeArgs) {
    const { admin, contractUri, gsnForwarder, name, symbol, initBaseURI, feeReceiver, feeNumerator } = args;
    return [admin, contractUri, gsnForwarder, name, symbol, initBaseURI, feeReceiver, feeNumerator] as Parameters<
        ERC721Mintable['initialize']
    >;
}
