// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {StorageSlotUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol";
import {ERC1820RegistryConsumer} from "../../common/ERC1820/ERC1820RegistryConsumer.sol";

import {ITokenDna} from "./ITokenDna.sol";
import {ITokenDnaConsumer} from "./ITokenDnaConsumer.sol";

abstract contract TokenDnaConsumerAbstract is AccessControlUpgradeable, ERC1820RegistryConsumer, ITokenDnaConsumer {
    using StorageSlotUpgradeable for bytes32;

    bytes32 internal constant TOKEN_DNA_PROVIDER_ROLE = keccak256("TOKEN_DNA_PROVIDER_ROLE");
    bytes32 internal constant _TOKEN_DNA_PROVIDER_SLOT = keccak256("TOKEN_DNA_PROVIDER");

    function __TokenDnaConsumerAbstract_init_unchained(address _dnaProviderRole, address _dnaProvider) internal {
        _grantRole(TOKEN_DNA_PROVIDER_ROLE, _dnaProviderRole);
        _setDnaProvider(_dnaProvider);

        if (_registryExists()) {
            _registerInterface(type(ITokenDnaConsumer).interfaceId);
        }
    }

    function dnaProvider() public view returns (address) {
        return _TOKEN_DNA_PROVIDER_SLOT.getAddressSlot().value;
    }

    function setDnaProvider(address _dnaProvider) external onlyRole(TOKEN_DNA_PROVIDER_ROLE) {
        _setDnaProvider(_dnaProvider);
    }

    function _setDnaProvider(address _dnaProvider) internal {
        _TOKEN_DNA_PROVIDER_SLOT.getAddressSlot().value = _dnaProvider;
    }

    function getDna(uint256 tokenId) public view virtual returns (bytes memory) {
        return ITokenDna(dnaProvider()).getDna(tokenId);
    }

    function getDnaBatch(uint256[] memory tokenId) public view virtual returns (bytes[] memory) {
        return ITokenDna(dnaProvider()).getDnaBatch(tokenId);
    }

    function _setDna(uint256 tokenId, bytes memory dna) internal {
        ITokenDna(dnaProvider()).setDna(tokenId, dna);
    }

    function _setDnaBatch(uint256[] memory tokenId, bytes[] memory dna) internal {
        ITokenDna(dnaProvider()).setDnaBatch(tokenId, dna);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(AccessControlUpgradeable, ERC1820RegistryConsumer) returns (bool) {
        return ERC1820RegistryConsumer.supportsInterface(interfaceId);
    }
}
