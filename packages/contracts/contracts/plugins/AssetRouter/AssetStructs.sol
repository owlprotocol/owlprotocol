//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * Represents an [EIP-20] token and its amount.
 */
struct AssetERC20 {
    address contractAddr;
    uint256 amount;
}

/**
 * @dev Represents a set of [EIP-721] tokens or
 * an entire collection (when `tokenIds.length` = 0).
 */
struct AssetERC721 {
    address contractAddr;
}

/**
 * @dev Represents a set of [EIP-1155] tokens, and associated amounts.
 * Invariant: `amounts.length == tokenIds.length`
 */
struct AssetERC1155 {
    address contractAddr;
    uint256[] amounts;
    uint256[] tokenIds;
}

struct AssetBasket {
    AssetERC20[] erc20;
    AssetERC721[] erc721;
    AssetERC1155[] erc1155;
}
