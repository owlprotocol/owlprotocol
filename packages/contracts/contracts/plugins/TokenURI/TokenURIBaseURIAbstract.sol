//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {StringsUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

import {ITokenURI} from "./ITokenURI.sol";
import {ITokenURIBaseURI} from "./ITokenURIBaseURI.sol";
import {StorageSlotString} from "../../utils/StorageSlotString.sol";
import {ERC1820RegistryConsumer} from "../../common/ERC1820/ERC1820RegistryConsumer.sol";

/**
 * @dev TokenURI with a base uri that is concatenated with tokenId
 * Commonly used by ERC721 as it often generates uri as `api.com/id`
 */
abstract contract TokenURIBaseURIAbstract is
    AccessControlUpgradeable,
    ERC1820RegistryConsumer,
    ITokenURIBaseURI,
    ITokenURI
{
    using StorageSlotString for bytes32;
    using StringsUpgradeable for uint256;

    bytes32 internal constant TOKEN_URI_BASE_URI_ROLE = keccak256("TOKEN_URI_BASE_URI_ROLE");
    bytes32 internal constant _TOKEN_URI_BASE_URI_SLOT = keccak256("TOKEN_URI_BASE_URI");

    /**
     * @dev TokenURIBaseURIAbstract unchained initialization.
     * @param _baseUriRole write role
     * @param _baseUri initial contract base uri
     */
    function __TokenURIBaseURIAbstract_init_unchained(address _baseUriRole, string memory _baseUri) internal {
        _grantRole(TOKEN_URI_BASE_URI_ROLE, _baseUriRole);
        _setTokenURIBaseURI(_baseUri);

        if (_registryExists()) {
            _registerInterface(type(ITokenURI).interfaceId);
            _registerInterface(type(ITokenURIBaseURI).interfaceId);
        }
    }

    /**
     * @dev Returns collection-wide URI-accessible metadata
     */
    function baseURI() public view returns (string memory) {
        return _TOKEN_URI_BASE_URI_SLOT.getStringSlot().value;
    }

    /**
     * @dev Set contract base uri
     */
    function setTokenURIBaseURI(string memory uri) external onlyRole(TOKEN_URI_BASE_URI_ROLE) {
        _setTokenURIBaseURI(uri);
    }

    /**
     * @dev Set contract base uri
     */
    function _setTokenURIBaseURI(string memory uri) internal {
        _TOKEN_URI_BASE_URI_SLOT.getStringSlot().value = uri;
    }

    function tokenURI(uint256 tokenId) external view virtual returns (string memory) {
        string memory value = baseURI();
        return bytes(value).length > 0 ? string(abi.encodePacked(value, tokenId.toString())) : "";
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(AccessControlUpgradeable, ERC1820RegistryConsumer) returns (bool) {
        return ERC1820RegistryConsumer.supportsInterface(interfaceId);
    }
}
