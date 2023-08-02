import type { TokenURI } from "../../typechain/ethers/contracts/plugins/TokenURI/TokenURI.js";

export interface TokenURIInitializeArgs {
    admin: Parameters<TokenURI["initialize"]>[0];
    contractUri?: Parameters<TokenURI["initialize"]>[1];
    uriRole?: Parameters<TokenURI["initialize"]>[2];
    uri?: Parameters<TokenURI["initialize"]>[3];
}

export function initializeUtil(args: TokenURIInitializeArgs) {
    const { admin, contractUri, uriRole, uri } = args;
    return [admin, contractUri ?? "", uriRole ?? admin, uri ?? ""] as [
        Parameters<TokenURI["initialize"]>[0],
        Parameters<TokenURI["initialize"]>[1],
        Parameters<TokenURI["initialize"]>[2],
        Parameters<TokenURI["initialize"]>[3],
    ];
}
