import { constants } from "ethers";
import type { ERC721MintableAutoId } from "../../typechain/ethers/contracts/assets/ERC721/ERC721MintableAutoId.js";

export interface ERC721MintableAutoIdInitializeArgs {
    admin: Parameters<ERC721MintableAutoId["initialize"]>[0];
    contractUri?: Parameters<ERC721MintableAutoId["initialize"]>[1];
    name: Parameters<ERC721MintableAutoId["initialize"]>[2];
    symbol: Parameters<ERC721MintableAutoId["initialize"]>[3];
    tokenUriProvider?: Parameters<ERC721MintableAutoId["initialize"]>[4];
    tokenRoyaltyProvider?: Parameters<ERC721MintableAutoId["initialize"]>[5];
}

export function initializeUtil(args: ERC721MintableAutoIdInitializeArgs) {
    const { admin, contractUri, name, symbol, tokenUriProvider, tokenRoyaltyProvider } = args;
    return [
        admin,
        contractUri ?? "",
        name,
        symbol,
        tokenUriProvider ?? constants.AddressZero,
        tokenRoyaltyProvider ?? constants.AddressZero,
    ] as [
            Parameters<ERC721MintableAutoId["initialize"]>[0],
            Parameters<ERC721MintableAutoId["initialize"]>[1],
            Parameters<ERC721MintableAutoId["initialize"]>[2],
            Parameters<ERC721MintableAutoId["initialize"]>[3],
            Parameters<ERC721MintableAutoId["initialize"]>[4],
            Parameters<ERC721MintableAutoId["initialize"]>[5],
        ];
}
