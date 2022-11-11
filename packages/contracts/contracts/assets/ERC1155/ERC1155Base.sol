// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ContextUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';

import {ERC1155Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol';
import {ERC1155BurnableUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol';

import {OwlBase} from '../../common/OwlBase.sol';
import {BaseURI} from '../../common/BaseURI.sol';
import {ERC2981Setter} from '../common/ERC2981Setter.sol';

import {IERC165Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';
import {IERC1155Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol';
import {IERC2981Upgradeable} from '@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol';
import {IERC2981Setter} from '../common/IERC2981Setter.sol';
import {IAccessControlUpgradeable} from '@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol';
import {IRouterReceiver} from '../../common/IRouterReceiver.sol';
import {IContractURI} from '../../common/IContractURI.sol';

abstract contract ERC1155Base is ERC1155BurnableUpgradeable, OwlBase, ERC2981Setter {
    bytes32 private constant URI_ROLE = keccak256('URI_ROLE');

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    function __ERC1155Base_init(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        string memory _uri,
        address _feeReceiver,
        uint96 _feeNumerator
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __ERC1155_init_unchained(_uri);
        __ERC2981Setter_init_unchained(_admin, _feeReceiver, _feeNumerator);
        __ERC1155Base_init_unchained(_admin);
    }

    function __ERC1155Base_init_unchained(address _uriRole) internal {
        _grantRole(URI_ROLE, _uriRole);
        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IERC2981Setter).interfaceId);
            registry.updateERC165Cache(address(this), type(IERC1155Upgradeable).interfaceId);
            registry.setInterfaceImplementer(address(this), type(IERC2981Setter).interfaceId | ONE, address(this));
            registry.setInterfaceImplementer(address(this), type(IERC1155Upgradeable).interfaceId | ONE, address(this));
        }
    }

    /**
     * @notice Must have URI_ROLE role!
     * @dev Allows setting the uri
     * @param newuri set the baseURI value.
     */
    function setURI(string calldata newuri) public onlyRole(URI_ROLE) {
        _setURI(newuri);
    }

    /**
     * @notice the following 3 functions are all required for OpenGSN integration
     */
    function _msgSender() internal view override(OwlBase, ContextUpgradeable) returns (address) {
        return OwlBase._msgSender();
    }

    function _msgData() internal view override(OwlBase, ContextUpgradeable) returns (bytes calldata) {
        return OwlBase._msgData();
    }

    /**
     * @inheritdoc OwlBase
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(OwlBase, ERC1155Upgradeable, ERC2981Setter)
        returns (bool)
    {
        return
            interfaceId == type(IERC165Upgradeable).interfaceId ||
            interfaceId == type(IERC1155Upgradeable).interfaceId ||
            interfaceId == type(IERC2981Upgradeable).interfaceId ||
            interfaceId == type(IERC2981Setter).interfaceId ||
            interfaceId == type(IAccessControlUpgradeable).interfaceId ||
            interfaceId == type(IRouterReceiver).interfaceId ||
            interfaceId == type(IContractURI).interfaceId;
    }
}
