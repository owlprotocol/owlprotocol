// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ITokenDna {
    /**
     * @dev Getter for dna of tokenId
     * @param tokenId to get
     * @return dna of tokenId
     */
    function getDna(uint256 tokenId) external view returns (bytes memory);

    function getDnaBatch(uint256[] memory tokenId) external view returns (bytes[] memory);

    /**
     * @notice Must have DNA_ROLE
     * @dev Change dna of a tokenId
     * @param tokenId to change
     * @param dna for the provided tokenId
     */
    function setDna(uint256 tokenId, bytes calldata dna) external;

    function setDnaBatch(uint256[] memory tokenId, bytes[] memory dna) external;
}
