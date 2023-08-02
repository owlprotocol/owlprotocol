// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @dev Interface for the NFT Royalty Standard setter
 */
interface IERC721MinterAutoIdDna {
    function mint(address to, bytes memory dna) external returns (uint256);

    function mintBatch(address[] memory to, bytes[] memory dna) external returns (uint256[] memory);

    function safeMint(address to, bytes memory dna) external returns (uint256);

    function safeMintBatch(address[] memory to, bytes[] memory dna) external returns (uint256[] memory);
}
