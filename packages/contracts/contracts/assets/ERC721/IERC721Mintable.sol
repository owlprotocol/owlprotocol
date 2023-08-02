// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * Interface for nested NFT that can be minted with auto-Id.
 */
interface IERC721Mintable {
    /**
     * @notice Must have MINTER_ROLE
     * @dev Allows MINTER_ROLE to mint NFTs
     * @param to address to
     * @param tokenId tokenId value
     */
    function mint(address to, uint256 tokenId) external;

    function mintBatch(address[] memory to, uint256[] memory tokenId) external;

    /**
     * @notice Must have MINTER_ROLE
     * @dev Allows caller to mint NFTs (safeMint)
     * @param to address to
     * @param tokenId tokenId value
     */
    function safeMint(address to, uint256 tokenId) external;

    function safeMintBatch(address[] memory to, uint256[] memory tokenId) external;
}
