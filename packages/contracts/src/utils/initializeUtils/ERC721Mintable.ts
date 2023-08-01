import { constants } from "ethers";
import type { ERC721Mintable } from "../../typechain/ethers/contracts/assets/ERC721/ERC721Mintable.js";

export interface ERC721MintableInitializeArgs {
    admin: Parameters<ERC721Mintable["initialize"]>[0];
    contractUri?: Parameters<ERC721Mintable["initialize"]>[1];
    gsnForwarder?: Parameters<ERC721Mintable["initialize"]>[2];
    name: Parameters<ERC721Mintable["initialize"]>[3];
    symbol: Parameters<ERC721Mintable["initialize"]>[4];
    tokenUriProvider?: Parameters<ERC721Mintable["initialize"]>[5];
    tokenRoyaltyProvider?: Parameters<ERC721Mintable["initialize"]>[6];
}

export function initializeUtil(args: ERC721MintableInitializeArgs) {
    const { admin, contractUri, gsnForwarder, name, symbol, tokenUriProvider, tokenRoyaltyProvider } = args;
    return [
        admin,
        contractUri ?? "",
        gsnForwarder ?? constants.AddressZero,
        name,
        symbol,
        tokenUriProvider ?? constants.AddressZero,
        tokenRoyaltyProvider ?? constants.AddressZero,
    ] as [
            Parameters<ERC721Mintable["initialize"]>[0],
            Parameters<ERC721Mintable["initialize"]>[1],
            Parameters<ERC721Mintable["initialize"]>[2],
            Parameters<ERC721Mintable["initialize"]>[3],
            Parameters<ERC721Mintable["initialize"]>[4],
            Parameters<ERC721Mintable["initialize"]>[5],
            Parameters<ERC721Mintable["initialize"]>[6],
        ]
}
