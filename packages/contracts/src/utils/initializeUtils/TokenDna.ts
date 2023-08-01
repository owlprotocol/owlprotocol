import { constants } from "ethers";
import type { TokenDna } from "../../typechain/ethers/contracts/plugins/TokenDna/TokenDna.js";

export interface TokenDnaInitializeArgs {
    admin: Parameters<TokenDna["initialize"]>[0];
    contractUri?: Parameters<TokenDna["initialize"]>[1];
    gsnForwarder?: Parameters<TokenDna["initialize"]>[2];
    dnaRole?: Parameters<TokenDna["initialize"]>[3];
}

export function initializeUtil(args: TokenDnaInitializeArgs) {
    const { admin, contractUri, gsnForwarder, dnaRole } = args;
    return [admin, contractUri ?? "", gsnForwarder ?? constants.AddressZero, dnaRole ?? admin] as [
        Parameters<TokenDna["initialize"]>[0],
        Parameters<TokenDna["initialize"]>[1],
        Parameters<TokenDna["initialize"]>[2],
        Parameters<TokenDna["initialize"]>[3],
    ];
}
