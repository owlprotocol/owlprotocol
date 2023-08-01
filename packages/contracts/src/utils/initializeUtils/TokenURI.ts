import { constants } from "ethers";
import type { TokenURI } from "../../typechain/ethers/contracts/plugins/TokenURI/TokenURI.js";

export interface TokenURIInitializeArgs {
    admin: Parameters<TokenURI["initialize"]>[0];
    contractUri?: Parameters<TokenURI["initialize"]>[1];
    gsnForwarder?: Parameters<TokenURI["initialize"]>[2];
    uriRole?: Parameters<TokenURI["initialize"]>[3];
    uri?: Parameters<TokenURI["initialize"]>[4];
}

export function initializeUtil(args: TokenURIInitializeArgs) {
    const { admin, contractUri, gsnForwarder, uriRole, uri } = args;
    return [admin, contractUri ?? "", gsnForwarder ?? constants.AddressZero, uriRole ?? admin, uri ?? ""] as [
        Parameters<TokenURI["initialize"]>[0],
        Parameters<TokenURI["initialize"]>[1],
        Parameters<TokenURI["initialize"]>[2],
        Parameters<TokenURI["initialize"]>[3],
        Parameters<TokenURI["initialize"]>[4],
    ];
}
