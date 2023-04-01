import { constants } from "ethers";
import type { ERC721Dna } from "../ethers/types.js";

export interface ERC721DnaInitializeArgs {
    admin: Parameters<ERC721Dna["initialize"]>[0];
    contractUri?: Parameters<ERC721Dna["initialize"]>[1];
    gsnForwarder?: Parameters<ERC721Dna["initialize"]>[2];
    name: Parameters<ERC721Dna["initialize"]>[3];
    symbol: Parameters<ERC721Dna["initialize"]>[4];
    initBaseURI: Parameters<ERC721Dna["initialize"]>[5];
    feeReceiver?: Parameters<ERC721Dna["initialize"]>[6];
    feeNumerator?: Parameters<ERC721Dna["initialize"]>[7];
}

export function flattenInitArgsERC721Dna(args: ERC721DnaInitializeArgs) {
    const { admin, contractUri, gsnForwarder, name, symbol, initBaseURI, feeReceiver, feeNumerator } = args;
    return [
        admin,
        contractUri ?? "",
        gsnForwarder ?? constants.AddressZero,
        name,
        symbol,
        initBaseURI,
        feeReceiver ?? admin,
        feeNumerator ?? 0,
    ] as Parameters<ERC721Dna["initialize"]>;
}
