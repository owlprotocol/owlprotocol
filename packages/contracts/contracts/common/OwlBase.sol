//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import {IAccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol";

import {ContextUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {IERC1820RegistryUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC1820RegistryUpgradeable.sol";

import {ContractURI} from "./ContractURI.sol";
import {RouterReceiver} from "./RouterReceiver.sol";
import {ERC1820RegistryConsumer} from "./ERC1820/ERC1820RegistryConsumer.sol";

import {IOwlBase} from "./IOwlBase.sol";
import {IRouterReceiver} from "./IRouterReceiver.sol";
import {IContractURI} from "./IContractURI.sol";

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
    ERC1820RegistryConsumer,
    ContractURI,
    RouterReceiver,
    IOwlBase
{
    // Consistent version across all contracts
    string internal constant _version = "v0.1";

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
    function __OwlBase_init(address _admin, string memory _initContractURI, address _forwarder) internal {
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
        if (_registryExists()) {
            _registerInterface(type(IERC165Upgradeable).interfaceId);
            _registerInterface(type(IAccessControlUpgradeable).interfaceId);
        }
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

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(AccessControlUpgradeable, ERC1820RegistryConsumer, ContractURI, RouterReceiver)
        returns (bool)
    {
        return ERC1820RegistryConsumer.supportsInterface(interfaceId);
    }
}
