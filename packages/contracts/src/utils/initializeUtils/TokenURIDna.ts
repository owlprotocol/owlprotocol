import { constants } from "ethers";
import type { TokenURIDna } from "../../typechain/ethers/contracts/plugins/TokenURI/TokenURIDna.js";

export interface TokenURIDnaInitializeArgs {
    admin: Parameters<TokenURIDna["initialize"]>[0];
    contractUri?: Parameters<TokenURIDna["initialize"]>[1];
    gsnForwarder?: Parameters<TokenURIDna["initialize"]>[2];
    baseUriRole?: Parameters<TokenURIDna["initialize"]>[3];
    baseUri?: Parameters<TokenURIDna["initialize"]>[4];
    dnaProviderRole?: Parameters<TokenURIDna["initialize"]>[5];
    dnaProvider?: Parameters<TokenURIDna["initialize"]>[6];
}

export function initializeUtil(args: TokenURIDnaInitializeArgs) {
    const { admin, contractUri, gsnForwarder, baseUriRole, baseUri, dnaProviderRole, dnaProvider } = args;
    return [
        admin,
        contractUri ?? "",
        gsnForwarder ?? constants.AddressZero,
        baseUriRole ?? admin,
        baseUri ?? "",
        dnaProviderRole ?? admin,
        dnaProvider ?? constants.AddressZero,
    ] as [
            Parameters<TokenURIDna["initialize"]>[0],
            Parameters<TokenURIDna["initialize"]>[1],
            Parameters<TokenURIDna["initialize"]>[2],
            Parameters<TokenURIDna["initialize"]>[3],
            Parameters<TokenURIDna["initialize"]>[4],
            Parameters<TokenURIDna["initialize"]>[5],
            Parameters<TokenURIDna["initialize"]>[6],
        ];
}
