// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ERC1820RegistryConsumer} from "../../common/ERC1820/ERC1820RegistryConsumer.sol";
import {StorageSlotUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol";

import {ITokenConsumer} from "./ITokenConsumer.sol";

/**
 * @dev Contract that stores a token address
 */
abstract contract TokenConsumerAbstract is AccessControlUpgradeable, ERC1820RegistryConsumer, ITokenConsumer {
    using StorageSlotUpgradeable for bytes32;

    bytes32 internal constant TOKEN_ROLE = keccak256("TOKEN_ROLE");
    bytes32 internal constant _TOKEN_SLOT = keccak256("TOKEN");

    function __TokenConsumerAbstract_init_unchained(address _tokenRole, address _token) internal {
        _grantRole(TOKEN_ROLE, _tokenRole);
        _setToken(_token);

        if (_registryExists()) {
            _registerInterface(type(ITokenConsumer).interfaceId);
        }
    }

    function token() public view returns (address) {
        return _TOKEN_SLOT.getAddressSlot().value;
    }

    function setToken(address _token) external onlyRole(TOKEN_ROLE) {
        _setToken(_token);
    }

    function _setToken(address _token) internal {
        _TOKEN_SLOT.getAddressSlot().value = _token;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(AccessControlUpgradeable, ERC1820RegistryConsumer) returns (bool) {
        return ERC1820RegistryConsumer.supportsInterface(interfaceId);
    }
}
