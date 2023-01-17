// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC721ReceiverUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol';
import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {IERC1155ReceiverUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol';

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
    using EnumerableSetUpgradeable for EnumerableSetUpgradeable.UintSet;

    //ERC721 Attachments
    //Child contracts
    EnumerableSetUpgradeable.AddressSet internal childContracts721; //2 slots
    // Adding 1 allows 0 to be the null value
    // There can only be one child token per contract
    // childTokenContract => childTokenId => tokenId
    mapping(address => mapping(uint256 => uint256)) public parentTokenIdOf;
    // tokenId => childTokenContract => childTokenId
    mapping(uint256 => mapping(address => uint256)) public childTokenIdOf721;

    //ERC1155 Attachment
    EnumerableSetUpgradeable.AddressSet internal childContracts1155; //2 slots
    // tokenId => childTokenContract1155 => [childTokenId]
    mapping(uint256 => mapping(address => EnumerableSetUpgradeable.UintSet)) internal childTokenIdOf1155;

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[46] private __gap;

    /**
     * @dev Initialize ERC721TopDown
     * @param _childContracts721 child contracts that can be owned
     * @param _childContracts1155 child contracts that can be owned
     */
    function __ERC721TopDown_init_unchained(address[] memory _childContracts721, address[] memory _childContracts1155)
        internal
    {
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

        for (uint256 i = 0; i < _childContracts721.length; i++) childContracts721.add(_childContracts721[i]);
        for (uint256 i = 0; i < _childContracts1155.length; i++) childContracts1155.add(_childContracts1155[i]);
    }

    /***** Getters *****/
    /**
     * inheritdoc IERC721TopDown
     */
    function getChildContracts() external view returns (address[] memory, address[] memory) {
        return (childContracts721.values(), childContracts1155.values());
    }

    /**
     * inheritdoc IERC721TopDown
     * TODO: Return 1155 contracts children (nested array)
     */
    function childTokenIdsOf(uint256 tokenId) external view returns (uint256[] memory) {
        address[] memory childContractAddresses = childContracts721.values();
        uint256[] memory tokenIds = new uint256[](childContractAddresses.length);
        for (uint256 i = 0; i < tokenIds.length; i++) {
            tokenIds[i] = childTokenIdOf721[tokenId][childContractAddresses[i]];
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

    /***** Child NFTs *****/
    function setChildren(
        uint256 tokenId,
        address[] calldata childContracts721Set,
        uint256[] calldata childTokenIds721Set,
        address[] calldata childContracts1155Remove,
        uint256[][] calldata childTokenIds1155Remove,
        address[] calldata childContracts1155Add,
        uint256[][] calldata childTokenIds1155Add
    ) external {
        //attach MUST be done by rootOwner
        address spender = _msgSender();
        {
            address rootOwner = rootOwnerOf(tokenId);
            if (spender != rootOwner) revert Unauthorized(spender, address(this), tokenId);
        }

        {
            ERC721TopDownLib.setChildren721(
                childContracts721,
                parentTokenIdOf,
                childTokenIdOf721,
                spender,
                tokenId,
                childContracts721Set,
                childTokenIds721Set
            );
        }

        {
            ERC721TopDownLib.setChildren1155(
                childContracts1155,
                childTokenIdOf1155,
                spender,
                tokenId,
                childContracts1155Remove,
                childTokenIds1155Remove,
                childContracts1155Add,
                childTokenIds1155Add
            );
        }
    }

    /***** Overrides ******/
    /**
     * @dev Direct attachment via transfer (avoids need for approvals)
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 childTokenId,
        bytes memory data
    ) external override returns (bytes4) {
        // Only child contracts can send NFTs into this contract
        address childContract = msg.sender;
        if (!childContracts721.contains(childContract)) revert AddressNotChild(childContract);
        //Self-transfer, approve
        if (operator == address(this)) return IERC721ReceiverUpgradeable.onERC721Received.selector;

        uint256 tokenId = abi.decode(data, (uint256));
        address rootOwner = rootOwnerOf(tokenId);
        if (from != rootOwner) revert Unauthorized(from, address(this), tokenId);

        ERC721TopDownLib.setChild721(
            childContracts721,
            parentTokenIdOf,
            childTokenIdOf721,
            from,
            tokenId,
            childContract,
            childTokenId,
            true
        );

        return IERC721ReceiverUpgradeable.onERC721Received.selector;
    }

    /**
     * @dev Direct attachment via transfer (avoids need for approvals)
     */
    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata childTokenIds,
        uint256[] calldata amounts,
        bytes calldata data
    ) external returns (bytes4) {
        // Only child contracts can send NFTs into this contract
        address childContract = msg.sender;
        if (!childContracts1155.contains(childContract)) revert AddressNotChild(childContract);
        //Self-transfer, approve
        if (operator == address(this)) return IERC1155ReceiverUpgradeable.onERC1155Received.selector;

        uint256 tokenId = abi.decode(data, (uint256));
        address rootOwner = rootOwnerOf(tokenId);
        if (from != rootOwner) revert Unauthorized(from, address(this), tokenId);

        for (uint256 i = 0; i < childTokenIds.length; i++) {
            if (amounts[i] != 1) revert();
        }

        ERC721TopDownLib.attachChild1155(
            childContracts1155,
            childTokenIdOf1155,
            from,
            tokenId,
            childContract,
            childTokenIds,
            true
        );

        return IERC1155ReceiverUpgradeable.onERC1155Received.selector;
    }

    /**
     * inheritdoc IERC721Base
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return
            interfaceId == type(IERC721TopDown).interfaceId ||
            interfaceId == type(IERC721ReceiverUpgradeable).interfaceId ||
            interfaceId == type(IERC1155ReceiverUpgradeable).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
