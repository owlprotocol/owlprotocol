// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";
import {IERC2981Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {StorageSlotUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol";
import {ERC1820RegistryConsumer} from "../../common/ERC1820/ERC1820RegistryConsumer.sol";

import {IERC2981Consumer} from "./IERC2981Consumer.sol";

abstract contract ERC2981ConsumerAbstract is AccessControlUpgradeable, ERC1820RegistryConsumer, IERC2981Consumer {
    using StorageSlotUpgradeable for bytes32;

    bytes32 internal constant TOKEN_ROYALTY_PROVIDER_ROLE = keccak256("TOKEN_ROYALTY_PROVIDER_ROLE");
    bytes32 internal constant _TOKEN_ROYALTY_PROVIDER_SLOT = keccak256("TOKEN_ROYALTY_PROVIDER");

    function royaltyProvider() public view returns (address) {
        return StorageSlotUpgradeable.getAddressSlot(_TOKEN_ROYALTY_PROVIDER_SLOT).value;
    }

    function setRoyaltyProvider(address _royaltyProvider) external onlyRole(TOKEN_ROYALTY_PROVIDER_ROLE) {
        _setRoyaltyProvider(_royaltyProvider);
    }

    function _setRoyaltyProvider(address _royaltyProvider) internal {
        _TOKEN_ROYALTY_PROVIDER_SLOT.getAddressSlot().value = _royaltyProvider;
    }

    function royaltyInfo(
        uint256 _tokenId,
        uint256 _salePrice
    ) public view virtual returns (address receiver, uint256 royaltyAmount) {
        return IERC2981Upgradeable(royaltyProvider()).royaltyInfo(_tokenId, _salePrice);
    }

    function __ERC2981ConsumerAbstract_init_unchained(address _royaltyProviderRole, address _royaltyProvider) internal {
        _grantRole(TOKEN_ROYALTY_PROVIDER_ROLE, _royaltyProviderRole);
        _setRoyaltyProvider(_royaltyProvider);

        if (_registryExists()) {
            _registerInterface(type(IERC2981Upgradeable).interfaceId);
            _registerInterface(type(IERC2981Consumer).interfaceId);
        }
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(IERC165Upgradeable, AccessControlUpgradeable, ERC1820RegistryConsumer)
        returns (bool)
    {
        return ERC1820RegistryConsumer.supportsInterface(interfaceId);
    }
}
