import { constants } from "ethers";
import type { ERC1155Mintable } from "../../typechain/ethers/contracts/assets/ERC1155/ERC1155Mintable.js";

export interface ERC1155MintableInitializeArgs {
    admin: Parameters<ERC1155Mintable["initialize"]>[0];
    contractUri?: Parameters<ERC1155Mintable["initialize"]>[1];
    tokenUriProvider?: Parameters<ERC1155Mintable["initialize"]>[2];
    tokenRoyaltyProvider?: Parameters<ERC1155Mintable["initialize"]>[3];
}

export function initializeUtil(args: ERC1155MintableInitializeArgs) {
    const { admin, contractUri, tokenUriProvider, tokenRoyaltyProvider } = args;
    return [
        admin,
        contractUri ?? "",
        tokenUriProvider ?? constants.AddressZero,
        tokenRoyaltyProvider ?? constants.AddressZero,
    ] as [
            Parameters<ERC1155Mintable["initialize"]>[0],
            Parameters<ERC1155Mintable["initialize"]>[1],
            Parameters<ERC1155Mintable["initialize"]>[2],
            Parameters<ERC1155Mintable["initialize"]>[3],
        ];
}
