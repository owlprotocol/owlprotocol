import { constants, utils } from "ethers";
import type { ERC721MintableAutoId, ERC721MintableAutoIdInterface as Interface } from "../ethers/types.js";
import { ERC721Mintable as ERC721MintableArtifact } from "../artifacts.js";

export const ERC721MintableAutoIdInterface = new utils.Interface(ERC721MintableArtifact.abi) as Interface;
export interface ERC721MintableAutoIdInitializeArgs {
    admin: Parameters<ERC721MintableAutoId["initialize"]>[0];
    contractUri?: Parameters<ERC721MintableAutoId["initialize"]>[1];
    gsnForwarder?: Parameters<ERC721MintableAutoId["initialize"]>[2];
    name: Parameters<ERC721MintableAutoId["initialize"]>[3];
    symbol: Parameters<ERC721MintableAutoId["initialize"]>[4];
    initBaseURI: Parameters<ERC721MintableAutoId["initialize"]>[5];
    feeReceiver?: Parameters<ERC721MintableAutoId["initialize"]>[6];
    feeNumerator?: Parameters<ERC721MintableAutoId["initialize"]>[7];
}

export function flattenInitArgsERC721MintableAutoId(args: ERC721MintableAutoIdInitializeArgs) {
    const { admin, contractUri, gsnForwarder, name, symbol, initBaseURI, feeReceiver, feeNumerator } = args;
    return [
        admin,
        contractUri ?? "",
        gsnForwarder ?? constants.AddressZero,
        name,
        symbol,
        initBaseURI,
        feeReceiver ?? admin,
        feeNumerator ?? 0,
    ] as [
        Parameters<ERC721MintableAutoId["initialize"]>[0],
        Parameters<ERC721MintableAutoId["initialize"]>[1],
        Parameters<ERC721MintableAutoId["initialize"]>[2],
        Parameters<ERC721MintableAutoId["initialize"]>[3],
        Parameters<ERC721MintableAutoId["initialize"]>[4],
        Parameters<ERC721MintableAutoId["initialize"]>[5],
        Parameters<ERC721MintableAutoId["initialize"]>[6],
        Parameters<ERC721MintableAutoId["initialize"]>[7],
    ];
}
