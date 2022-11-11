// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * Interface for NFT with encoded attributes.
 */
interface IERC20Dna {
    /***** DNA *****/
    /**
     * @dev Getter for dna of tokenId
     */
    function getDna(uint256 tokenId) external returns (uint256);

    /**
     * @notice Must have DNA_ROLE
     * @dev Allows changing the dna of a tokenId
     * @param newDna new dna for the provided tokenId
     */
    function updateDna(uint256 tokenId, uint256 newDna) external returns (uint256);
}
