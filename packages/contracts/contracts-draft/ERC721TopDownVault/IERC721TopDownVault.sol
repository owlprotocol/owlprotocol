// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * Interface for nested NFT that can own other NFTs.
 */
interface IERC721TopDownVault {
    event SetChild721(
        address indexed parentOwner,
        uint256 indexed parentTokenId,
        address indexed childContract,
        uint256 childTokenId
    );
    event AttachedChild1155(
        address indexed parentOwner,
        uint256 indexed parentTokenId,
        address indexed childContract,
        uint256[] childTokenIds
    );
    event DetachedChild1155(
        address indexed parentOwner,
        uint256 indexed parentTokenId,
        address indexed childContract,
        uint256[] childTokenIds
    );

    /**
     * @dev Get child contracts that define attachment attributes
     */
    function getChildContracts() external view returns (address[] memory, address[] memory);

    /**
     * @dev Get parentTokenId of locked child nft
     */
    function parentTokenIdOf(address childContract, uint256 childTokenId) external view returns (uint256);

    /**
     * @dev Get childTokenId of nft
     */
    function childTokenIdOf721(uint256 tokenId, address childContract) external view returns (uint256);

    /**
     * @dev Get childTokenId of nft
     */
    function childTokenIdsOf(uint256 tokenId) external view returns (uint256[] memory);

    /**
     * @dev Get the root owner of the parent token by recursing up the ownership tree
     * until we react a non-ERC721TopDown address (EOA or contract).
     * @param tokenId tokenId
     * @return ownerOfAddress EOA or non-ERC721TopDown contract
     */
    function rootOwnerOf(uint256 tokenId) external view returns (address);

    /***** Child NFTs *****/
    /**
     * @dev Attach a child NFT
     */
    function setChildren(
        uint256 tokenId,
        address[] calldata childContracts721Set,
        uint256[] calldata childTokenIds721Set,
        address[] calldata childContracts1155Remove,
        uint256[][] calldata childTokenIds1155Remove,
        address[] calldata childContracts1155Add,
        uint256[][] calldata childTokenIds1155Add
    ) external;
}
