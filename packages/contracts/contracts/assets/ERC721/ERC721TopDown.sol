// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC721ReceiverUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol';
import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {IERC165Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';

import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import {EnumerableSetUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol';

import {ERC721Base} from './ERC721Base.sol';
import {IERC721TopDown} from './IERC721TopDown.sol';
import {ERC721TopDownLib, Unauthorized, AddressNotChild} from './ERC721TopDownLib.sol';

/**
 * @dev Nested Top Down ERC721. Parents can own child tokens among fixed set of child contracts.
 */
abstract contract ERC721TopDown is ERC721Base, IERC721TopDown, IERC721ReceiverUpgradeable {
    using AddressUpgradeable for address;
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.AddressSet;

    //Child contracts
    EnumerableSetUpgradeable.AddressSet internal childContracts; //2 slots

    // Adding 1 allows 0 to be the null value
    // There can only be one child token per contract
    // childTokenContract => childTokenId => tokenId
    mapping(address => mapping(uint256 => uint256)) public parentTokenIdOf;
    // tokenId => childTokenContract => childTokenId
    mapping(uint256 => mapping(address => uint256)) public childTokenIdOf;

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[46] private __gap;

    /**
     * @dev Initialize ERC721TopDown
     * @param _childContracts child contracts that can be owned
     */
    function __ERC721TopDown_init_unchained(address[] memory _childContracts) internal {
        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IERC721ReceiverUpgradeable).interfaceId);
            registry.updateERC165Cache(address(this), type(IERC721TopDown).interfaceId);
            registry.setInterfaceImplementer(
                address(this),
                type(IERC721ReceiverUpgradeable).interfaceId | ONE,
                address(this)
            );
            registry.setInterfaceImplementer(address(this), type(IERC721TopDown).interfaceId | ONE, address(this));
        }

        for (uint256 i = 0; i < _childContracts.length; i++) childContracts.add(_childContracts[i]);
    }

    /***** Getters *****/
    /**
     * inheritdoc IERC721TopDown
     */
    function getChildContracts() external view returns (address[] memory) {
        return childContracts.values();
    }

    /**
     * inheritdoc IERC721TopDown
     */
    function childTokenIdsOf(uint256 tokenId) external view returns (uint256[] memory) {
        address[] memory childContractAddresses = childContracts.values();
        uint256[] memory tokenIds = new uint256[](childContractAddresses.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            tokenIds[i] = childTokenIdOf[tokenId][childContractAddresses[i]];
        }

        return tokenIds;
    }

    /***** Ownership ******/
    /**
     * inheritdoc IERC721TopDown
     */
    function rootOwnerOf(uint256 tokenId) public view returns (address) {
        address parentContractAddress = ownerOf(tokenId);
        address childContractAddress = address(this);

        while (ERC721TopDownLib.isERC721TopDown(parentContractAddress)) {
            tokenId = IERC721TopDown(parentContractAddress).parentTokenIdOf(childContractAddress, tokenId);
            (parentContractAddress, childContractAddress) = (
                IERC721Upgradeable(parentContractAddress).ownerOf(tokenId),
                parentContractAddress
            );
        }

        return parentContractAddress;
    }

    /**
     * @dev Returns whether `spender` is allowed to manage `tokenId`.
     *
     * owner == spender || approved(tokenId) == spender || operator(owner, spender) == true
     */
    function isApprovedOrRootOwner(
        address rootOwner,
        uint256 tokenId,
        address spender
    ) internal view returns (bool) {
        return spender == rootOwner || isApprovedForAll(rootOwner, spender) || getApproved(tokenId) == spender;
    }

    /**
     * @dev Returns wether `spender` is allowed to manage `childTokenId`.
     * Approvals only work if parentTokenOwner = childOwner.
     * owner == spender || approved(tokenId) == spender || operator(owner, spender) == true
     */
    function isChildApprovedOrRootOwner(
        address childContract,
        address childOwner,
        uint256 childTokenId,
        address spender,
        address parentOwner
    ) internal view returns (bool) {
        return
            spender == childOwner ||
            ((IERC721Upgradeable(childContract).isApprovedForAll(childOwner, spender) ||
                IERC721Upgradeable(childContract).getApproved(childTokenId) == spender) && childOwner == parentOwner);
    }

    /***** Child NFTs *****/
    /**
     * @dev Attach a child NFT, external function. Implements security checks.
     *      In addition, address(this) must be approved to transfer childTokenId (operator or specific tokenId).
     * @param tokenId stored in this contract
     * @param childContract to attach
     * @param childTokenId to attach
     */
    function attachChild(
        uint256 tokenId,
        address childContract,
        uint256 childTokenId
    ) external {
        //Check if childContract supported
        if (!childContracts.contains(childContract)) revert AddressNotChild(childContract);

        //Check if currentChildTokenId assigned

        //Ownership checks (both for parentOwner & spender)
        address spender = _msgSender();
        //Token
        address rootOwner = rootOwnerOf(tokenId);
        bool isApproved = isApprovedOrRootOwner(rootOwner, tokenId, spender);
        if (!isApproved) revert Unauthorized(spender, address(this), tokenId);

        //Child Token
        address childOwner = IERC721Upgradeable(childContract).ownerOf(childTokenId);
        //Check childTokenId spender
        bool isChildApprovedOrOwner = isChildApprovedOrRootOwner(
            childContract,
            childOwner,
            childTokenId,
            spender,
            rootOwner
        );

        if (!isChildApprovedOrOwner) revert Unauthorized(spender, childContract, childTokenId);

        ERC721TopDownLib.attachChild(parentTokenIdOf, childTokenIdOf, childOwner, tokenId, childContract, childTokenId);
        emit AttachedChild(rootOwner, tokenId, childContract, childTokenId);
    }

    /**
     * @dev Detach a child NFT, external function. Implements security checks.
     * @param tokenId stored in this contract
     * @param childContract to detach
     * @param childTokenId to detach
     */
    function detachChild(
        uint256 tokenId,
        address childContract,
        uint256 childTokenId
    ) external {
        //Ownership checks (both for parentOwner & spender)
        address spender = _msgSender();
        //Token
        address rootOwner = rootOwnerOf(tokenId);
        bool isApproved = isApprovedOrRootOwner(rootOwner, tokenId, spender);
        if (!isApproved) revert Unauthorized(spender, address(this), tokenId);

        //No child approval checks, as these are inherited by parent token
        //State updates, transfer child token & update mappings
        ERC721TopDownLib.detachChild(parentTokenIdOf, childTokenIdOf, rootOwner, tokenId, childContract, childTokenId);
        emit DetachedChild(rootOwner, tokenId, childContract, childTokenId);
    }

    /***** Overrides ******/
    /**
     * @dev Safety check, only accept child contracts & operator == address(this)
     */
    function onERC721Received(
        address operator,
        address,
        uint256 tokenId,
        bytes memory
    ) external view override returns (bytes4) {
        // Only child contracts can send NFTs into this contract
        address tokenAddress = msg.sender;
        //Pull-only transfers sent by this contract
        if (operator != address(this)) revert Unauthorized(operator, tokenAddress, tokenId);

        if (!childContracts.contains(tokenAddress)) revert AddressNotChild(tokenAddress);
        return IERC721ReceiverUpgradeable.onERC721Received.selector;
    }

    /**
     * inheritdoc IERC721Base
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return
            interfaceId == type(IERC721TopDown).interfaceId ||
            interfaceId == type(IERC721ReceiverUpgradeable).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
