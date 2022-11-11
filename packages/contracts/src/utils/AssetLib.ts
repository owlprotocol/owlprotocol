export interface AssetERC20 {
    contractAddr: string;
    amount: number;
}

export interface AssetERC721 {
    contractAddr: string;
    tokenIds: number[];
}

export interface AssetERC1155 {
    contractAddr: string;
    amounts: number[];
    tokenIds: number[];
}

export interface AssetBasketInput {
    burnAddress: string;
    erc20Unaffected: AssetERC20[];
    erc20Burned: AssetERC20[];
    erc721Unaffected: AssetERC721[];
    erc721Burned: AssetERC721[];
    erc721NTime: AssetERC721[];
    erc721NTimeMax: number[];
    erc1155Unaffected: AssetERC1155[];
    erc1155Burned: AssetERC1155[];
}

export interface AssetBasketOutput {
    outputableAmount: number;
    erc20Transfer: AssetERC20[];
    erc20Mint: AssetERC20[];
    erc721Transfer: AssetERC721[];
    erc721Mint: AssetERC721[];
    erc721MintAutoId: AssetERC721[];
    erc1155Transfer: AssetERC1155[];
    erc1155Mint: AssetERC1155[];
}
