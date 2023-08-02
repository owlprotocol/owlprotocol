import { constants } from "ethers";
import type { TokenURIDna } from "../../typechain/ethers/contracts/plugins/TokenURI/TokenURIDna.js";

export interface TokenURIDnaInitializeArgs {
    admin: Parameters<TokenURIDna["initialize"]>[0];
    contractUri?: Parameters<TokenURIDna["initialize"]>[1];
    baseUriRole?: Parameters<TokenURIDna["initialize"]>[2];
    baseUri?: Parameters<TokenURIDna["initialize"]>[3];
    dnaProviderRole?: Parameters<TokenURIDna["initialize"]>[4];
    dnaProvider?: Parameters<TokenURIDna["initialize"]>[5];
}

export function initializeUtil(args: TokenURIDnaInitializeArgs) {
    const { admin, contractUri, baseUriRole, baseUri, dnaProviderRole, dnaProvider } = args;
    return [
        admin,
        contractUri ?? "",
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
        ];
}
