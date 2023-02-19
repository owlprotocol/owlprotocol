import type { ERC1155Dna } from '../ethers/types.js';

export interface ERC1155DnaInitializeArgs {
    admin: Parameters<ERC1155Dna['initialize']>[0];
    contractUri: Parameters<ERC1155Dna['initialize']>[1];
    gsnForwarder: Parameters<ERC1155Dna['initialize']>[2];
    uri: Parameters<ERC1155Dna['initialize']>[3];
    feeReceiver: Parameters<ERC1155Dna['initialize']>[4];
    feeNumerator: Parameters<ERC1155Dna['initialize']>[5];
}

export function flattenInitArgsERC1155Dna(args: ERC1155DnaInitializeArgs) {
    const { admin, contractUri, gsnForwarder, uri, feeReceiver, feeNumerator } = args;
    return [admin, contractUri, gsnForwarder, uri, feeReceiver, feeNumerator] as Parameters<
        ERC1155Dna['initialize']
    >;
}
