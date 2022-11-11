// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @dev Interface for the NFT Royalty Standard setter
 */
interface IERC2981Setter  {
    /**
     * @dev exposing `_setTokenRoyalty`
     */
    function setTokenRoyalty(
        uint256 tokenId,
        address receiver,
        uint96 feeNumerator
    ) external;

    /**
     * @dev Exposing `_setDefaultRoyalty`
     */
    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external;
}
