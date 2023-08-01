// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC2981Upgradeable} from "@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol";
import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ERC2981Upgradeable} from "@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol";

import {ERC1820RegistryConsumer} from "../../common/ERC1820/ERC1820RegistryConsumer.sol";

import {IERC2981Setter} from "./IERC2981Setter.sol";

/**
 * @dev ERC2981 with access control public functions
 */
abstract contract ERC2981SetterAbstract is
    AccessControlUpgradeable,
    ERC1820RegistryConsumer,
    ERC2981Upgradeable,
    IERC2981Setter
{
    using AddressUpgradeable for address;

    bytes32 internal constant ROYALTY_ROLE = keccak256("ROYALTY_ROLE");

    /**
     * @dev ERC2981SetterAbstract unchained initialization
     * @param _royaltyRole write role
     * @param _royaltyReceiver initial royalty receiver
     * @param _feeNumerator fee numerator
     */
    function __ERC2981SetterAbstract_init_unchained(
        address _royaltyRole,
        address _royaltyReceiver,
        uint96 _feeNumerator
    ) internal {
        _grantRole(ROYALTY_ROLE, _royaltyRole);
        _setDefaultRoyalty(_royaltyReceiver, _feeNumerator);

        if (_registryExists()) {
            _registerInterface(type(IERC2981Upgradeable).interfaceId);
            _registerInterface(type(IERC2981Setter).interfaceId);
        }
    }

    /**
     * @dev exposing `_setTokenRoyalty`
     */
    function setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) external onlyRole(ROYALTY_ROLE) {
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
    }

    /**
     * @dev Exposing `_setDefaultRoyalty`
     */
    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external onlyRole(ROYALTY_ROLE) {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC2981Upgradeable, AccessControlUpgradeable, ERC1820RegistryConsumer)
        returns (bool)
    {
        return ERC1820RegistryConsumer.supportsInterface(interfaceId);
    }
}
