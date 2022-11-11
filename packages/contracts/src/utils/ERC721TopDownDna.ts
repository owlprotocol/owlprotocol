import type { ERC721TopDownDna } from '../ethers/types.js';

export interface ERC721TopDownDnaInitializeArgs {
    admin: Parameters<ERC721TopDownDna['initialize']>[0];
    contractUri: Parameters<ERC721TopDownDna['initialize']>[1];
    gsnForwarder: Parameters<ERC721TopDownDna['initialize']>[2];
    name: Parameters<ERC721TopDownDna['initialize']>[3];
    symbol: Parameters<ERC721TopDownDna['initialize']>[4];
    initBaseURI: Parameters<ERC721TopDownDna['initialize']>[5];
    feeReceiver: Parameters<ERC721TopDownDna['initialize']>[6];
    feeNumerator: Parameters<ERC721TopDownDna['initialize']>[7];
    childContracts: Parameters<ERC721TopDownDna['initialize']>[8];
}

export function flattenInitArgsERC721TopDownDna(args: ERC721TopDownDnaInitializeArgs) {
    const { admin, contractUri, gsnForwarder, name, symbol, initBaseURI, feeReceiver, feeNumerator, childContracts } =
        args;
    return [
        admin,
        contractUri,
        gsnForwarder,
        name,
        symbol,
        initBaseURI,
        feeReceiver,
        feeNumerator,
        childContracts,
    ] as Parameters<ERC721TopDownDna['initialize']>;
}
