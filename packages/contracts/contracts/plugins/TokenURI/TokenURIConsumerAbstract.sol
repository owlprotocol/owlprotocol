// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {StorageSlotUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol";
import {ERC1820RegistryConsumer} from "../../common/ERC1820/ERC1820RegistryConsumer.sol";

import {ITokenURI} from "./ITokenURI.sol";
import {ITokenURIConsumer} from "./ITokenURIConsumer.sol";

abstract contract TokenURIConsumerAbstract is AccessControlUpgradeable, ERC1820RegistryConsumer, ITokenURIConsumer {
    using StorageSlotUpgradeable for bytes32;

    bytes32 internal constant TOKEN_URI_PROVIDER_ROLE = keccak256("TOKEN_URI_PROVIDER_ROLE");
    bytes32 internal constant _TOKEN_URI_PROVIDER_SLOT = keccak256("TOKEN_URI_PROVIDER");

    function uriProvider() public view returns (address) {
        return StorageSlotUpgradeable.getAddressSlot(_TOKEN_URI_PROVIDER_SLOT).value;
    }

    function setUriProvider(address _uriProvider) external onlyRole(TOKEN_URI_PROVIDER_ROLE) {
        _setUriProvider(_uriProvider);
    }

    function _setUriProvider(address _uriProvider) internal {
        _TOKEN_URI_PROVIDER_SLOT.getAddressSlot().value = _uriProvider;
    }

    function _tokenURI(uint256 tokenId) internal view returns (string memory) {
        return ITokenURI(uriProvider()).tokenURI(tokenId);
    }

    function __TokenURIConsumerAbstract_init_unchained(address _uriProviderRole, address _uriProvider) internal {
        _grantRole(TOKEN_URI_PROVIDER_ROLE, _uriProviderRole);
        _setUriProvider(_uriProvider);

        if (_registryExists()) {
            _registerInterface(type(ITokenURIConsumer).interfaceId);
        }
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(AccessControlUpgradeable, ERC1820RegistryConsumer) returns (bool) {
        return ERC1820RegistryConsumer.supportsInterface(interfaceId);
    }
}
