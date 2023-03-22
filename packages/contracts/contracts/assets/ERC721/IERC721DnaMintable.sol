// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @dev Interface for NFT with encoded attributes.
 */
interface IERC721DnaMintable {
    /**
     * @notice Must have MINTER_ROLE
     * @dev Allows MINTER_ROLE to mint NFTs
     * @param to address to
     * @param dna of new token
     */
    function mintWithDna(address to, uint256 tokenId, bytes calldata dna) external returns (uint256);

    /**
     * @notice Must have MINTER_ROLE
     * @dev Allows MINTER_ROLE to mint NFTs (safeMint)
     * @param to address to
     * @param dna of new token
     */
    function safeMintWithDna(address to, uint256 tokenId, bytes calldata dna) external returns (uint256);

    /**
     * @dev Getter for dna of tokenId
     * @param tokenId to get
     * @return dna of tokenId
     */
    function getDna(uint256 tokenId) external view returns (bytes memory);

    /**
     * @notice Must have DNA_ROLE
     * @dev Change dna of a tokenId
     * @param tokenId to change
     * @param dna for the provided tokenId
     */
    function updateDna(uint256 tokenId, bytes calldata dna) external;
}
