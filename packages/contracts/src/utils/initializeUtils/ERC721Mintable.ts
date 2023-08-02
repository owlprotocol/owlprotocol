import { constants } from "ethers";
import type { ERC721Mintable } from "../../typechain/ethers/contracts/assets/ERC721/ERC721Mintable.js";

export interface ERC721MintableInitializeArgs {
    admin: Parameters<ERC721Mintable["initialize"]>[0];
    contractUri?: Parameters<ERC721Mintable["initialize"]>[1];
    name: Parameters<ERC721Mintable["initialize"]>[2];
    symbol: Parameters<ERC721Mintable["initialize"]>[3];
    tokenUriProvider?: Parameters<ERC721Mintable["initialize"]>[4];
    tokenRoyaltyProvider?: Parameters<ERC721Mintable["initialize"]>[5];
}

export function initializeUtil(args: ERC721MintableInitializeArgs) {
    const { admin, contractUri, name, symbol, tokenUriProvider, tokenRoyaltyProvider } = args;
    return [
        admin,
        contractUri ?? "",
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
        ]
}
