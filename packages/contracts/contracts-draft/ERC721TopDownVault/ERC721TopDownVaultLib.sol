// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import {EnumerableSetUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol";
import {IERC721Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import {IERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";

import {IERC721TopDownVault} from "./IERC721TopDownVault.sol";

error AddressNotChild(address childTokenAddress);
error TokenIdZero();
error ChildTokenAlreadyAssigned(address childTokenAddress, uint256 childTokenId, uint256 currentChildTokenId);
error ChildTokenNotAttached(uint256 tokenId, address childTokenAddress);
error Unauthorized(address owner, address tokenAddress, uint256 tokenId);

library ERC721TopDownLib {
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.UintSet;

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

    function setChildren721(
        EnumerableSetUpgradeable.AddressSet storage childContracts721,
        mapping(address => mapping(uint256 => uint256)) storage parentTokenIdOf,
        mapping(uint256 => mapping(address => uint256)) storage childTokenIdOf721,
        address from,
        uint256 tokenId,
        address[] calldata childContracts721Set,
        uint256[] calldata childTokenIds721Set
    ) external {
        {
            //Add 721
            for (uint256 i = 0; i < childContracts721Set.length; i++) {
                address childContract = childContracts721Set[i];
                uint256 childTokenId = childTokenIds721Set[i];
                //State updates, transfer child token & update mappings
                setChild721(
                    childContracts721,
                    parentTokenIdOf,
                    childTokenIdOf721,
                    from,
                    tokenId,
                    childContract,
                    childTokenId,
                    false
                );
            }
        }
    }

    function setChildren1155(
        EnumerableSetUpgradeable.AddressSet storage childContracts1155,
        mapping(uint256 => mapping(address => EnumerableSetUpgradeable.UintSet)) storage childTokenIdOf1155,
        address from,
        uint256 tokenId,
        address[] calldata childContracts1155Remove,
        uint256[][] calldata childTokenIds1155Remove,
        address[] calldata childContracts1155Add,
        uint256[][] calldata childTokenIds1155Add
    ) external {
        {
            //Remove 1155
            for (uint256 i = 0; i < childContracts1155Remove.length; i++) {
                address childContract = childContracts1155Remove[i];
                uint256[] memory childTokenIds = childTokenIds1155Remove[i];
                //State updates, transfer child token & update mappings
                detachChild1155(childContracts1155, childTokenIdOf1155, from, tokenId, childContract, childTokenIds);
            }
        }

        {
            //Add 1155
            for (uint256 i = 0; i < childContracts1155Add.length; i++) {
                address childContract = childContracts1155Add[i];
                uint256[] memory childTokenIds = childTokenIds1155Add[i];
                //State updates, transfer child token & update mappings
                attachChild1155(
                    childContracts1155,
                    childTokenIdOf1155,
                    from,
                    tokenId,
                    childContract,
                    childTokenIds,
                    false
                );
            }
        }
    }

    /**
     * @dev Attach a child NFT, internal function. Implements state changes.
     * @param parentTokenIdOf parent tokenId mapping
     * @param childTokenIdOf721 child tokenId mapping
     * @param from owner of tokenId
     * @param token address of token
     * @param tokenId parent token id
     * @param childContract721 to attach
     * @param childTokenId to attach/detach if childTokenId = 0, simply detach
     * @param deposited whether token was already deposited or not
     */
    function _setChild721(
        EnumerableSetUpgradeable.AddressSet storage childContracts721,
        mapping(address => mapping(uint256 => uint256)) storage parentTokenIdOf,
        mapping(uint256 => mapping(address => uint256)) storage childTokenIdOf721,
        address from,
        address token,
        uint256 tokenId,
        address childContract721,
        uint256 childTokenId,
        bool deposited
    ) internal {
        //Compute token-bound account
        address tba = address(0);

        //tba === from? => call coming from owner of token

        //Check if token-bound account (TBA) owns child
        //true, skip transfer
        bool owner = IERC721(token).ownerOf(tokenId);
        //false, transfer asset
        if (tba == owner) {} else {
            //TODO: transfer asset by using TBA (might be approved, saves gas).
            //Requires user to call TBA.executeCall(token.setApprovalForAll(address(this))/token.approve(address(this), tokenId))
        }
        //transfer asset by proxy (first transfer here, then transfer to TBA)
        //Requires user to call token.setApprovalForAll(address(this))/token.approve(address(this), tokenId) OR auto-approve by admin
        {

        }
        //update variable
        {

        }
    }

    /**
     * @dev Attach a child NFT, internal function. Implements state changes.
     * @param parentTokenIdOf parent tokenId mapping
     * @param childTokenIdOf721 child tokenId mapping
     * @param from owner of tokenId
     * @param tokenId stored in this contract
     * @param childContract721 to attach
     * @param childTokenId to attach/detach if childTokenId = 0, simply detach
     * @param deposited whether token was already deposited or not
     */
    function setChild721(
        EnumerableSetUpgradeable.AddressSet storage childContracts721,
        mapping(address => mapping(uint256 => uint256)) storage parentTokenIdOf,
        mapping(uint256 => mapping(address => uint256)) storage childTokenIdOf721,
        address from,
        uint256 tokenId,
        address childContract721,
        uint256 childTokenId,
        bool deposited
    ) public {
        if (!childContracts721.contains(childContract721)) revert AddressNotChild(childContract721);

        //Store previous child token
        uint256 currentChildTokenId = childTokenIdOf721[tokenId][childContract721];
        childTokenIdOf721[tokenId][childContract721] = childTokenId;
        if (!deposited && childTokenId != 0 && currentChildTokenId != childTokenId) {
            parentTokenIdOf[childContract721][childTokenId] = tokenId;
            //Regular transfer as to == address(this)
            IERC721Upgradeable(childContract721).transferFrom(from, address(this), childTokenId);
        }

        if (currentChildTokenId != 0 && currentChildTokenId != childTokenId) {
            //Child tokenId already assigned, swap out
            IERC721Upgradeable(childContract721).safeTransferFrom(address(this), from, currentChildTokenId);
        }

        emit SetChild721(from, tokenId, childContract721, childTokenId);
    }

    function attachChild1155(
        EnumerableSetUpgradeable.AddressSet storage childContracts1155,
        mapping(uint256 => mapping(address => EnumerableSetUpgradeable.UintSet)) storage childTokenIdOf1155,
        address from,
        uint256 tokenId,
        address childContract1155,
        uint256[] memory childTokenIds,
        bool deposited
    ) public {
        if (!childContracts1155.contains(childContract1155)) revert AddressNotChild(childContract1155);

        uint256[] memory amounts = new uint256[](childTokenIds.length);

        for (uint256 i = 0; i < childTokenIds.length; i++) {
            uint256 childTokenId = childTokenIds[i];
            bool currentChildTokenId = childTokenIdOf1155[tokenId][childContract1155].contains(childTokenId);

            if (!currentChildTokenId) {
                //Can only assign 1 instance of 1155, so this gets skipped (amount = 0) if token already attached
                childTokenIdOf1155[tokenId][childContract1155].add(childTokenId);
                amounts[i] = 1;
            } else if (deposited) {
                //Deposited but already assigned
                revert();
            }
        }

        //Transfer tokens
        if (!deposited) {
            IERC1155Upgradeable(childContract1155).safeBatchTransferFrom(
                from,
                address(this),
                childTokenIds,
                amounts,
                new bytes(0)
            );
        }

        emit AttachedChild1155(from, tokenId, childContract1155, childTokenIds);
    }

    function detachChild1155(
        EnumerableSetUpgradeable.AddressSet storage childContracts1155,
        mapping(uint256 => mapping(address => EnumerableSetUpgradeable.UintSet)) storage childTokenIdOf1155,
        address from,
        uint256 tokenId,
        address childContract1155,
        uint256[] memory childTokenIds
    ) public {
        if (!childContracts1155.contains(childContract1155)) revert AddressNotChild(childContract1155);

        uint256[] memory amounts = new uint256[](childTokenIds.length);

        for (uint256 i = 0; i < childTokenIds.length; i++) {
            uint256 childTokenId = childTokenIds[i];
            bool currentChildTokenId = childTokenIdOf1155[tokenId][childContract1155].contains(childTokenId);
            if (currentChildTokenId) {
                //Check if token id is assigned, otherwise ignore
                childTokenIdOf1155[tokenId][childContract1155].remove(childTokenId);
                amounts[i] = 1;
            }
        }

        //Transfer tokens
        IERC1155Upgradeable(childContract1155).safeBatchTransferFrom(
            address(this),
            from,
            childTokenIds,
            amounts,
            new bytes(0)
        );

        emit DetachedChild1155(from, tokenId, childContract1155, childTokenIds);
    }
}
