//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ERC1820RegistryConsumer} from "./ERC1820/ERC1820RegistryConsumer.sol";
import {IContractURI} from "./IContractURI.sol";
import {StorageSlotString} from "../utils/StorageSlotString.sol";

/**
 * @dev Implements contract uri getter/setter
 */
contract ContractURI is AccessControlUpgradeable, ERC1820RegistryConsumer, IContractURI {
    bytes32 internal constant CONTRACT_URI_ROLE = keccak256("CONTRACT_URI_ROLE");
    bytes32 internal constant _CONTRACT_URI_SLOT = keccak256("CONTRACT_URI");

    /**
     * @dev ContractURI chained initialization
     * @param _contractUriRole write role
     * @param _initContractURI initial contract uri
     */
    function __ContractURI_init(address _contractUriRole, string memory _initContractURI) internal {
        __ContractURI_init_unchained(_contractUriRole, _initContractURI);
    }

    /**
     * @dev ContractURI unchained initialization.
     * @param _contractUriRole write role
     * @param _initContractURI initial contract uri
     */
    function __ContractURI_init_unchained(address _contractUriRole, string memory _initContractURI) internal {
        _grantRole(CONTRACT_URI_ROLE, _contractUriRole);
        _setContractURI(_initContractURI);

        if (_registryExists()) {
            _registerInterface(type(IContractURI).interfaceId);
        }
    }

    /**
     * @dev Returns collection-wide URI-accessible metadata
     */
    function contractURI() public view returns (string memory) {
        return StorageSlotString.getStringSlot(_CONTRACT_URI_SLOT).value;
    }

    /**
     * @dev Set contract uri
     */
    function setContractURI(string memory uri) external onlyRole(CONTRACT_URI_ROLE) {
        _setContractURI(uri);
    }

    function _setContractURI(string memory uri) internal {
        StorageSlotString.getStringSlot(_CONTRACT_URI_SLOT).value = uri;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(AccessControlUpgradeable, ERC1820RegistryConsumer) returns (bool) {
        return ERC1820RegistryConsumer.supportsInterface(interfaceId);
    }
}
