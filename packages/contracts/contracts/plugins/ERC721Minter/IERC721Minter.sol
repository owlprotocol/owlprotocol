// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @dev Interface for the NFT Royalty Standard setter
 */
interface IERC721Minter {
    function mint(address to, uint256 tokenId) external;

    function mintBatch(address[] memory to, uint256[] memory tokenId) external;

    function safeMint(address to, uint256 tokenId) external;

    function safeMintBatch(address[] memory to, uint256[] memory tokenId) external;
}
