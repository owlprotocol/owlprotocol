import type { TokenDna } from "../../typechain/ethers/contracts/plugins/TokenDna/TokenDna.js";

export interface TokenDnaInitializeArgs {
    admin: Parameters<TokenDna["initialize"]>[0];
    contractUri?: Parameters<TokenDna["initialize"]>[1];
    dnaRole?: Parameters<TokenDna["initialize"]>[2];
}

export function initializeUtil(args: TokenDnaInitializeArgs) {
    const { admin, contractUri, dnaRole } = args;
    return [admin, contractUri ?? "", dnaRole ?? admin] as [
        Parameters<TokenDna["initialize"]>[0],
        Parameters<TokenDna["initialize"]>[1],
        Parameters<TokenDna["initialize"]>[2],
    ];
}
