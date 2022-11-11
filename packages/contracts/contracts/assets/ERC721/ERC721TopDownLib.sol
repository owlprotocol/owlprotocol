// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC165Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';
import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import {EnumerableSetUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol';
import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {IERC721TopDown} from './IERC721TopDown.sol';

error AddressNotChild(address childTokenAddress);
error TokenIdZero();
error ChildTokenAlreadyAssigned(address childTokenAddress, uint256 childTokenId, uint256 currentChildTokenId);
error ChildTokenNotAttached(uint256 tokenId, address childTokenAddress);
error Unauthorized(address owner, address tokenAddress, uint256 tokenId);

library ERC721TopDownLib {
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    /**
     * @dev check if address is ERC721 Top Down
     * @param contractAddress EOA, non-ERC721TopDown, ERC721TopDown
     */
    function isERC721TopDown(address contractAddress) internal view returns (bool) {
        //Case 0: EOA
        if (!AddressUpgradeable.isContract(contractAddress)) return false;
        //Case 1: Non-ERC721TopDown
        try IERC165Upgradeable(contractAddress).supportsInterface(type(IERC721TopDown).interfaceId) returns (
            bool supported
        ) {
            if (!supported) {
                //Non-ERC721TopDown
                return false;
            } else {
                return true;
            }
        } catch {
            //Non-IERC165, Non-ERC721TopDown
            return false;
        }
    }

    /**
     * @dev Attach a child NFT, internal function. Implements state changes.
     * @param parentTokenIdOf parent tokenId mapping
     * @param childTokenIdOf child tokenId mapping
     * @param from owner of tokenId
     * @param tokenId stored in this contract
     * @param childContract to attach
     * @param childTokenId to attach
     */
    function attachChild(
        mapping(address => mapping(uint256 => uint256)) storage parentTokenIdOf,
        mapping(uint256 => mapping(address => uint256)) storage childTokenIdOf,
        address from,
        uint256 tokenId,
        address childContract,
        uint256 childTokenId
    ) internal {
        uint256 currentChildTokenId = childTokenIdOf[tokenId][childContract];
        if (currentChildTokenId != 0)
            revert ChildTokenAlreadyAssigned(childContract, childTokenId, currentChildTokenId);

        childTokenIdOf[tokenId][childContract] = childTokenId;
        parentTokenIdOf[childContract][childTokenId] = tokenId;

        IERC721Upgradeable(childContract).safeTransferFrom(from, address(this), childTokenId);
    }

    /**
     * @dev Attach a child NFT, internal function. Implements state changes.
     * @param parentTokenIdOf parent tokenId mapping
     * @param childTokenIdOf child tokenId mapping
     * @param to owner of tokenId
     * @param tokenId stored in this contract
     * @param childContract to attach
     * @param childTokenId to attach
     */
    function detachChild(
        mapping(address => mapping(uint256 => uint256)) storage parentTokenIdOf,
        mapping(uint256 => mapping(address => uint256)) storage childTokenIdOf,
        address to,
        uint256 tokenId,
        address childContract,
        uint256 childTokenId
    ) internal {
        uint256 currentChildTokenId = childTokenIdOf[tokenId][childContract];
        if (currentChildTokenId != childTokenId)
            revert ChildTokenAlreadyAssigned(childContract, childTokenId, currentChildTokenId);

        delete childTokenIdOf[tokenId][childContract];
        delete parentTokenIdOf[childContract][childTokenId];

        IERC721Upgradeable(childContract).safeTransferFrom(address(this), to, childTokenId);
    }
}
