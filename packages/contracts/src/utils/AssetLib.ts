import type { BigNumberish } from "ethers";

export interface AssetERC20 {
    contractAddr: string;
    amount: BigNumberish;
}

export interface AssetERC721 {
    contractAddr: string;
}

export interface AssetERC1155 {
    contractAddr: string;
    amounts: BigNumberish[];
    tokenIds: BigNumberish[];
}

export interface AssetBasketInput {
    burnAddress: string;
    erc20Unaffected?: AssetERC20[];
    erc20Burned?: AssetERC20[];
    erc721Unaffected?: AssetERC721[];
    erc721Burned?: AssetERC721[];
    erc721NTime?: AssetERC721[];
    erc721NTimeMax?: BigNumberish[];
    erc1155Unaffected?: AssetERC1155[];
    erc1155Burned?: AssetERC1155[];
}

export function validateAssetBasketInput({
    burnAddress,
    erc20Unaffected,
    erc20Burned,
    erc721Unaffected,
    erc721Burned,
    erc721NTime,
    erc721NTimeMax,
    erc1155Unaffected,
    erc1155Burned,
}: AssetBasketInput) {
    //TODO: Validate erc721NTime.length == erc721NTimeMax.length
    return {
        burnAddress,
        erc20Unaffected: erc20Unaffected ?? [],
        erc20Burned: erc20Burned ?? [],
        erc721Unaffected: erc721Unaffected ?? [],
        erc721Burned: erc721Burned ?? [],
        erc721NTime: erc721NTime ?? [],
        erc721NTimeMax: erc721NTimeMax ?? [],
        erc1155Unaffected: erc1155Unaffected ?? [],
        erc1155Burned: erc1155Burned ?? [],
    };
}

export interface AssetBasketOutput {
    outputableAmount: BigNumberish;
    erc20Mint?: AssetERC20[];
    erc721MintAutoId?: AssetERC721[];
    erc1155Mint?: AssetERC1155[];
}

export function validateAssetBasketOutput({
    outputableAmount,
    erc20Mint,
    erc721MintAutoId,
    erc1155Mint,
}: AssetBasketOutput) {
    return {
        outputableAmount,
        erc20Mint: erc20Mint ?? [],
        erc721MintAutoId: erc721MintAutoId ?? [],
        erc1155Mint: erc1155Mint ?? [],
    };
}
