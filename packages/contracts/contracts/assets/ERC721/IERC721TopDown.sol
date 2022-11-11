// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * Interface for nested NFT that can own other NFTs.
 */
interface IERC721TopDown {
    event AttachedChild(
        address indexed parentOwner,
        uint256 indexed parentTokenId,
        address indexed childContract,
        uint256 childTokenId
    );
    event DetachedChild(
        address indexed parentOwner,
        uint256 indexed parentTokenId,
        address indexed childContract,
        uint256 childTokenId
    );

    /**
     * @dev Get child contracts that define attachment attributes
     */
    function getChildContracts() external view returns (address[] memory);

    /**
     * @dev Get parentTokenId of locked child nft
     */
    function parentTokenIdOf(address childContract, uint256 childTokenId) external view returns (uint256);

    /**
     * @dev Get childTokenId of nft
     */
    function childTokenIdOf(uint256 tokenId, address childContract) external view returns (uint256);

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
     * @param parentTokenId stored in this contract
     * @param childContract to attach
     * @param childTokenId to attach
     */
    function attachChild(
        uint256 parentTokenId,
        address childContract,
        uint256 childTokenId
    ) external;

    /**
     * @dev Detach a child NFT
     * @param parentTokenId stored in this contract
     * @param childContract to detach
     * @param childTokenId to detach
     */
    function detachChild(
        uint256 parentTokenId,
        address childContract,
        uint256 childTokenId
    ) external;
}
