// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ERC1820RegistryConsumer} from "../../common/ERC1820/ERC1820RegistryConsumer.sol";
import {Base64UrlUpgradeable} from "../../utils/Base64UrlUpgradeable.sol";
import {StorageSlotMappingUInt256Bytes} from "../../utils/StorageSlotMappingUInt256Bytes.sol";

import {ITokenDna} from "./ITokenDna.sol";

/**
 * @dev TokenDnaAbstract storage contract
 */
abstract contract TokenDnaAbstract is AccessControlUpgradeable, ERC1820RegistryConsumer, ITokenDna {
    using StorageSlotMappingUInt256Bytes for bytes32;

    bytes32 internal constant DNA_ROLE = keccak256("DNA_ROLE");
    bytes32 internal constant _DNA_SLOT = keccak256("DNA");

    /**
     * @dev TokenDnaAbstract unchained initialization
     * @param _dnaRole writer role
     */
    function __TokenDnaAbstract_init_unchained(address _dnaRole) internal {
        _grantRole(DNA_ROLE, _dnaRole);

        if (_registryExists()) {
            _registerInterface(type(ITokenDna).interfaceId);
        }
    }

    /**
     * inheritdoc ITokenDnaAbstract
     */
    function setDna(uint256 tokenId, bytes memory dna) public virtual onlyRole(DNA_ROLE) {
        mapping(uint256 => bytes) storage dnaStorage = _DNA_SLOT.getMapppingUInt256BytesSlot().value;
        dnaStorage[tokenId] = dna;
    }

    /**
     * inheritdoc ITokenDnaAbstract
     */
    function setDnaBatch(uint256[] memory tokenId, bytes[] memory dna) public virtual onlyRole(DNA_ROLE) {
        require(tokenId.length == dna.length, "tokenId.length != dna.length");
        mapping(uint256 => bytes) storage dnaStorage = _DNA_SLOT.getMapppingUInt256BytesSlot().value;

        for (uint256 i = 0; i < tokenId.length; i++) {
            dnaStorage[tokenId[i]] = dna[i];
        }
    }

    /**
     * inheritdoc ITokenDnaAbstract
     */
    function getDna(uint256 tokenId) external view virtual returns (bytes memory) {
        mapping(uint256 => bytes) storage dnaStorage = _DNA_SLOT.getMapppingUInt256BytesSlot().value;
        return dnaStorage[tokenId];
    }

    /**
     * inheritdoc ITokenDnaAbstract
     */
    function getDnaBatch(uint256[] memory tokenId) external view virtual returns (bytes[] memory) {
        mapping(uint256 => bytes) storage dnaStorage = _DNA_SLOT.getMapppingUInt256BytesSlot().value;

        bytes[] memory result = new bytes[](tokenId.length);
        for (uint256 i = 0; i < tokenId.length; i++) {
            result[i] = dnaStorage[tokenId[i]];
        }

        return result;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(AccessControlUpgradeable, ERC1820RegistryConsumer) returns (bool) {
        return ERC1820RegistryConsumer.supportsInterface(interfaceId);
    }
}
