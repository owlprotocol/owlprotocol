import { constants } from "ethers";
import type { ERC721MintableAutoId } from "../../typechain/ethers/contracts/assets/ERC721/ERC721MintableAutoId.js";

export interface ERC721MintableAutoIdInitializeArgs {
    admin: Parameters<ERC721MintableAutoId["initialize"]>[0];
    contractUri?: Parameters<ERC721MintableAutoId["initialize"]>[1];
    gsnForwarder?: Parameters<ERC721MintableAutoId["initialize"]>[2];
    name: Parameters<ERC721MintableAutoId["initialize"]>[3];
    symbol: Parameters<ERC721MintableAutoId["initialize"]>[4];
    tokenUriProvider?: Parameters<ERC721MintableAutoId["initialize"]>[5];
    tokenRoyaltyProvider?: Parameters<ERC721MintableAutoId["initialize"]>[6];
}

export function initializeUtil(args: ERC721MintableAutoIdInitializeArgs) {
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
            Parameters<ERC721MintableAutoId["initialize"]>[0],
            Parameters<ERC721MintableAutoId["initialize"]>[1],
            Parameters<ERC721MintableAutoId["initialize"]>[2],
            Parameters<ERC721MintableAutoId["initialize"]>[3],
            Parameters<ERC721MintableAutoId["initialize"]>[4],
            Parameters<ERC721MintableAutoId["initialize"]>[5],
            Parameters<ERC721MintableAutoId["initialize"]>[6],
        ];
}
