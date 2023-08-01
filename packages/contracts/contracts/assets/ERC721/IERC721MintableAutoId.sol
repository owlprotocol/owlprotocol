// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * Interface for nested NFT that can be minted with auto-Id.
 */
interface IERC721MintableAutoId {
    /**
     * @notice Must have MINTER_ROLE
     * @dev Allows MINTER_ROLE to mint NFTs
     * @param to address to
     */
    function mint(address to) external returns (uint256);

    function mintBatch(address[] memory to) external returns (uint256[] memory);

    /**
     * @notice Must have MINTER_ROLE
     * @dev Allows caller to mint NFTs (safeMint)
     * @param to address to
     */
    function safeMint(address to) external returns (uint256);

    function safeMintBatch(address[] memory to) external returns (uint256[] memory);
}
