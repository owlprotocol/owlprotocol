// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AccessControlUpgradeable} from '@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol';
import {ERC2981Upgradeable} from '@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol';

import {IERC2981Setter} from './IERC2981Setter.sol';

/**
 * @dev ERC2981 with access control public functions
 */
abstract contract ERC2981Setter is AccessControlUpgradeable, ERC2981Upgradeable, IERC2981Setter {
    bytes32 internal constant ROYALTY_ROLE = keccak256('ROYALTY_ROLE');

    /**
     * @dev ERC2981Setter chained initialization
     * @param _royaltyRole write role
     * @param _royaltyReceiver initial royalty receiver
     * @param _feeNumerator fee numerator
     */
    function __ERC2981Setter_init(
        address _royaltyRole,
        address _royaltyReceiver,
        uint96 _feeNumerator
    ) internal {
        __ERC2981Setter_init_unchained(_royaltyRole, _royaltyReceiver, _feeNumerator);
    }

    /**
     * @dev ERC2981Setter unchained initialization
     * @param _royaltyRole write role
     * @param _royaltyReceiver initial royalty receiver
     * @param _feeNumerator fee numerator
     */
    function __ERC2981Setter_init_unchained(
        address _royaltyRole,
        address _royaltyReceiver,
        uint96 _feeNumerator
    ) internal {
        _grantRole(ROYALTY_ROLE, _royaltyRole);
        _setDefaultRoyalty(_royaltyReceiver, _feeNumerator);
    }

    /**
     * @dev exposing `_setTokenRoyalty`
     */
    function setTokenRoyalty(
        uint256 tokenId,
        address receiver,
        uint96 feeNumerator
    ) external onlyRole(ROYALTY_ROLE) {
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
    }

    /**
     * @dev Exposing `_setDefaultRoyalty`
     */
    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external onlyRole(ROYALTY_ROLE) {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    /**
     * @dev ERC165 Support
     * @param interfaceId hash of the interface testing for
     * @return bool whether interface is supported
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(AccessControlUpgradeable, ERC2981Upgradeable)
        returns (bool)
    {
        return interfaceId == type(IERC2981Setter).interfaceId || super.supportsInterface(interfaceId);
    }
}
