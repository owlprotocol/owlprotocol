//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AccessControlUpgradeable} from '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import {IBaseURI} from './IBaseURI.sol';
import {StorageSlotString} from '../utils/StorageSlotString.sol';

/**
 * @dev Implements contract uri getter/setter
 */
contract BaseURI is AccessControlUpgradeable, IBaseURI {
    bytes32 internal constant BASE_URI_ROLE = keccak256('BASE_URI_ROLE');
    bytes32 internal constant _BASE_URI_SLOT = keccak256('BASE_URI');

    /**
     * @dev BaseURI chained initialization
     * @param _baseUriRole write role
     * @param _initBaseURI initial contract uri
     */
    function __BaseURI_init(address _baseUriRole, string memory _initBaseURI) internal {
        __BaseURI_init_unchained(_baseUriRole, _initBaseURI);
    }

    /**
     * @dev BaseURI unchained initialization.
     * @param _baseUriRole write role
     * @param _initBaseURI initial contract uri
     */
    function __BaseURI_init_unchained(address _baseUriRole, string memory _initBaseURI) internal {
        _grantRole(BASE_URI_ROLE, _baseUriRole);
        StorageSlotString.getStringSlot(_BASE_URI_SLOT).value = _initBaseURI;
    }

    /**
     * @dev Returns collection-wide URI-accessible metadata
     */
    function baseURI() public view returns (string memory) {
        return StorageSlotString.getStringSlot(_BASE_URI_SLOT).value;
    }

    /**
     * @dev Set contract uri
     */
    function setBaseURI(string memory uri) external onlyRole(BASE_URI_ROLE) {
        StorageSlotString.getStringSlot(_BASE_URI_SLOT).value = uri;
    }

    /**
     * @dev ERC165 Support
     * @param interfaceId XOR of the external functions of the interface
     * @return bool whether interface is supported
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IBaseURI).interfaceId || super.supportsInterface(interfaceId);
    }
}
