import { constants } from "ethers";
import type { TokenURIBaseURI } from "../../typechain/ethers/contracts/plugins/TokenURI/TokenURIBaseURI.js";

export interface TokenURIBaseURIInitializeArgs {
    admin: Parameters<TokenURIBaseURI["initialize"]>[0];
    contractUri?: Parameters<TokenURIBaseURI["initialize"]>[1];
    gsnForwarder?: Parameters<TokenURIBaseURI["initialize"]>[2];
    baseUriRole?: Parameters<TokenURIBaseURI["initialize"]>[3];
    baseUri?: Parameters<TokenURIBaseURI["initialize"]>[4];
}

export function initializeUtil(args: TokenURIBaseURIInitializeArgs) {
    const { admin, contractUri, gsnForwarder, baseUriRole, baseUri } = args;
    return [
        admin,
        contractUri ?? "",
        gsnForwarder ?? constants.AddressZero,
        baseUriRole ?? constants.AddressZero,
        baseUri ?? "",
    ] as [
            Parameters<TokenURIBaseURI["initialize"]>[0],
            Parameters<TokenURIBaseURI["initialize"]>[1],
            Parameters<TokenURIBaseURI["initialize"]>[2],
            Parameters<TokenURIBaseURI["initialize"]>[3],
            Parameters<TokenURIBaseURI["initialize"]>[4],
        ];
}
