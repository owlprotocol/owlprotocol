// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @dev Interface for the NFT Royalty Standard setter
 */
interface IERC721MinterAutoId {
    function mint(address to) external returns (uint256);

    function mintBatch(address[] memory to) external returns (uint256[] memory);

    function safeMint(address to) external returns (uint256);

    function safeMintBatch(address[] memory to) external returns (uint256[] memory);
}
