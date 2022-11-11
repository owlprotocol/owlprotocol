// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {ContextUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';

import {ERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol';
import {ERC721BurnableUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol';

import {StorageSlotString} from '../../utils/StorageSlotString.sol';

import {OwlBase} from '../../common/OwlBase.sol';
import {BaseURI} from '../../common/BaseURI.sol';
import {ERC2981Setter} from '../common/ERC2981Setter.sol';

import {IERC165Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';
import {IERC721Upgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol';
import {IERC721MetadataUpgradeable} from '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol';
import {IERC2981Upgradeable} from '@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol';
import {IERC2981Setter} from '../common/IERC2981Setter.sol';
import {IAccessControlUpgradeable} from '@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol';
import {IRouterReceiver} from '../../common/IRouterReceiver.sol';
import {IContractURI} from '../../common/IContractURI.sol';
import {IBaseURI} from '../../common/IBaseURI.sol';

/**
 * @dev This implements the standard OwlProtocol `ERC721` contract that is an
 * extension of Openzeppelin's `ERC721BurnableUpgradeable`. Initializations
 * happens through initializers for compatibility with a EIP1167 minimal-proxy
 * deployment strategy. No external mint functions are defined.
 */
abstract contract ERC721Base is ERC721BurnableUpgradeable, OwlBase, BaseURI, ERC2981Setter {
    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    /**********************
        Initialization
    **********************/
    function __ERC721Base_init(
        address _admin,
        string memory _initContractURI,
        address _gsnForwarder,
        string memory _name,
        string memory _symbol,
        string memory _initBaseURI,
        address _feeReceiver,
        uint96 _feeNumerator
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_gsnForwarder);
        __OwlBase_init_unchained(_admin);

        __ERC721_init_unchained(_name, _symbol);
        __BaseURI_init_unchained(_admin, _initBaseURI);
        __ERC2981Setter_init_unchained(_admin, _feeReceiver, _feeNumerator);
        __ERC721Base_init_unchained();
    }

    function __ERC721Base_init_unchained() internal {
        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IBaseURI).interfaceId);
            registry.updateERC165Cache(address(this), type(IERC2981Upgradeable).interfaceId);
            registry.updateERC165Cache(address(this), type(IERC2981Setter).interfaceId);
            registry.updateERC165Cache(address(this), type(IERC721Upgradeable).interfaceId);
            registry.updateERC165Cache(address(this), type(IERC721MetadataUpgradeable).interfaceId);

            registry.setInterfaceImplementer(address(this), type(IBaseURI).interfaceId | ONE, address(this));
            registry.setInterfaceImplementer(address(this), type(IERC2981Upgradeable).interfaceId | ONE, address(this));
            registry.setInterfaceImplementer(address(this), type(IERC2981Setter).interfaceId | ONE, address(this));
            registry.setInterfaceImplementer(address(this), type(IERC721Upgradeable).interfaceId | ONE, address(this));
            registry.setInterfaceImplementer(
                address(this),
                type(IERC721MetadataUpgradeable).interfaceId | ONE,
                address(this)
            );
        }
    }

    /**********************
          Interaction
    **********************/
    /**
     * @dev Overrides OZ internal baseURI getter.
     */
    function _baseURI() internal view override returns (string memory) {
        return StorageSlotString.getStringSlot(_BASE_URI_SLOT).value;
    }

    /**
     * @inheritdoc OwlBase
     */
    function _msgSender() internal view override(OwlBase, ContextUpgradeable) returns (address) {
        return OwlBase._msgSender();
    }

    /**
     * @inheritdoc OwlBase
     */
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
        override(OwlBase, ERC721Upgradeable, ERC2981Setter, BaseURI)
        returns (bool)
    {
        return
            interfaceId == type(IERC165Upgradeable).interfaceId ||
            interfaceId == type(IERC721Upgradeable).interfaceId ||
            interfaceId == type(IERC721MetadataUpgradeable).interfaceId ||
            interfaceId == type(IERC2981Upgradeable).interfaceId ||
            interfaceId == type(IERC2981Setter).interfaceId ||
            interfaceId == type(IBaseURI).interfaceId ||
            interfaceId == type(IAccessControlUpgradeable).interfaceId ||
            interfaceId == type(IRouterReceiver).interfaceId ||
            interfaceId == type(IContractURI).interfaceId;
    }
}
