import { constants } from 'ethers';
import type { ERC721TopDownDna } from '../ethers/types.js';

// This is also used for ERC721TopDownDnaMintable
export interface ERC721TopDownDnaInitializeArgs {
    admin: Parameters<ERC721TopDownDna['initialize']>[0];
    contractUri?: Parameters<ERC721TopDownDna['initialize']>[1];
    gsnForwarder?: Parameters<ERC721TopDownDna['initialize']>[2];
    name: Parameters<ERC721TopDownDna['initialize']>[3];
    symbol: Parameters<ERC721TopDownDna['initialize']>[4];
    initBaseURI: Parameters<ERC721TopDownDna['initialize']>[5];
    feeReceiver?: Parameters<ERC721TopDownDna['initialize']>[6];
    feeNumerator?: Parameters<ERC721TopDownDna['initialize']>[7];
    childContracts721?: Parameters<ERC721TopDownDna['initialize']>[8];
    childContracts1155?: Parameters<ERC721TopDownDna['initialize']>[9];
}

export function flattenInitArgsERC721TopDownDna(args: ERC721TopDownDnaInitializeArgs) {
    const {
        admin,
        contractUri,
        gsnForwarder,
        name,
        symbol,
        initBaseURI,
        feeReceiver,
        feeNumerator,
        childContracts721,
        childContracts1155,
    } = args;
    return [
        admin,
        contractUri ?? '',
        gsnForwarder ?? constants.AddressZero,
        name,
        symbol,
        initBaseURI,
        feeReceiver ?? admin,
        feeNumerator ?? 0,
        childContracts721 ?? [],
        childContracts1155 ?? [],
    ] as Parameters<ERC721TopDownDna['initialize']>;
}

export interface ERC721TopDownDnaSetChildrenArgs {
    tokenId: Parameters<ERC721TopDownDna['setChildren']>[0];
    childContracts721Set?: Parameters<ERC721TopDownDna['setChildren']>[1];
    childTokenIds721Set?: Parameters<ERC721TopDownDna['setChildren']>[2];
    childContracts1155Remove?: Parameters<ERC721TopDownDna['setChildren']>[3];
    childTokenIds1155Remove?: Parameters<ERC721TopDownDna['setChildren']>[4];
    childContracts1155Add?: Parameters<ERC721TopDownDna['setChildren']>[5];
    childTokenIds1155Add?: Parameters<ERC721TopDownDna['setChildren']>[6];
}

export function flattenSetChildrenArgsERC721TopDownDna(args: ERC721TopDownDnaSetChildrenArgs) {
    const {
        tokenId,
        childContracts721Set,
        childTokenIds721Set,
        childContracts1155Remove,
        childTokenIds1155Remove,
        childContracts1155Add,
        childTokenIds1155Add,
    } = args;
    return [
        tokenId,
        childContracts721Set ?? [],
        childTokenIds721Set ?? [],
        childContracts1155Remove ?? [],
        childTokenIds1155Remove ?? [],
        childContracts1155Add ?? [],
        childTokenIds1155Add ?? [],
    ] as Parameters<ERC721TopDownDna['setChildren']>;
}
