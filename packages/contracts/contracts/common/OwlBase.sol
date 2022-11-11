//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ContextUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import {UUPSUpgradeable} from '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';
import {AccessControlUpgradeable} from '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';
import {IERC1820RegistryUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC1820RegistryUpgradeable.sol';
import {ERC1820ImplementerUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/ERC1820ImplementerUpgradeable.sol';
import {ContractURI} from './ContractURI.sol';
import {RouterReceiver} from './RouterReceiver.sol';
import {IOwlBase} from './IOwlBase.sol';

import {IERC165Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol';
import {IAccessControlUpgradeable} from '@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol';
import {IRouterReceiver} from './IRouterReceiver.sol';
import {IContractURI} from './IContractURI.sol';

/**
 * @dev Base for all OwlProtocol contracts
 *
 * Implements several required mechanisms for all OwlProtocol contracts to
 * utilize:
 * - OpenGSN support (gasless transactions)
 * - Consistent contract versioning
 * - Consistent access control
 * - UUPS contract upgrade support
 */
contract OwlBase is
    ContextUpgradeable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    ContractURI,
    RouterReceiver,
    ERC1820ImplementerUpgradeable,
    IOwlBase
{
    // Consistent version across all contracts
    string internal constant _version = 'v0.1';
    address constant ERC1820_REGISTRY = 0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24;
    bytes32 constant ONE = 0x00000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
    IERC1820RegistryUpgradeable constant registry = IERC1820RegistryUpgradeable(ERC1820_REGISTRY);

    /**
        Chained / Unchained
        https://forum.openzeppelin.com/t/difference-between-init-and-init-unchained/25255/3

        Chained: constructor header replacement (parent inherited contracts)
        Unchained: constructor replacement (self init)

     */
    /**
     * @dev OwlBase chained initialization
     * @param _admin address to assign owner rights
     * @param _forwarder OpenGSN forwarder address (if desired).
     */
    function __OwlBase_init(
        address _admin,
        string memory _initContractURI,
        address _forwarder
    ) internal {
        __ContractURI_init_unchained(_admin, _initContractURI);
        __RouterReceiver_init_unchained(_forwarder);

        __OwlBase_init_unchained(_admin);
    }

    /**
     * @dev OwlBase unchained initialization.
     * @param _admin address to assign owner rights
     */
    function __OwlBase_init_unchained(address _admin) internal {
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        if (AddressUpgradeable.isContract(ERC1820_REGISTRY)) {
            registry.updateERC165Cache(address(this), type(IERC165Upgradeable).interfaceId);
            registry.setInterfaceImplementer(address(this), type(IERC165Upgradeable).interfaceId | ONE, address(this));
            registry.updateERC165Cache(address(this), type(IAccessControlUpgradeable).interfaceId);
            registry.setInterfaceImplementer(
                address(this),
                type(IAccessControlUpgradeable).interfaceId | ONE,
                address(this)
            );
            registry.updateERC165Cache(address(this), type(IRouterReceiver).interfaceId);
            registry.setInterfaceImplementer(address(this), type(IRouterReceiver).interfaceId | ONE, address(this));
            registry.updateERC165Cache(address(this), type(IContractURI).interfaceId);
            registry.setInterfaceImplementer(address(this), type(IContractURI).interfaceId | ONE, address(this));
        }
    }

    /**
     * @notice Only callable by admins
     * @dev UUPS function to authorize upgrades
     * @param newImplementation newImplementation
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyRole(DEFAULT_ADMIN_ROLE) {}

    /**
     * @dev Returns the implementation address.
     */
    function getImplementation() external view returns (address) {
        return _getImplementation();
    }

    /**
     * @dev OwlProtocol contract version. Used to determine compatibility
     * interoperable with other Owl contracts.
     */
    function version() external pure virtual returns (string memory) {
        return _version;
    }

    /** Overrides */
    function _msgSender() internal view virtual override(RouterReceiver, ContextUpgradeable) returns (address) {
        return RouterReceiver._msgSender();
    }

    function _msgData() internal view virtual override(RouterReceiver, ContextUpgradeable) returns (bytes calldata) {
        return RouterReceiver._msgData();
    }

    /**
     * @inheritdoc IERC165Upgradeable
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlUpgradeable, ContractURI, RouterReceiver)
        returns (bool)
    {
        return
            interfaceId == type(IERC165Upgradeable).interfaceId ||
            interfaceId == type(IAccessControlUpgradeable).interfaceId ||
            interfaceId == type(IRouterReceiver).interfaceId ||
            interfaceId == type(IContractURI).interfaceId;
    }
}
