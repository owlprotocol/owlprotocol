// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/introspection/ERC1820Implementer.sol)

pragma solidity ^0.8.0;

/**
 * @dev Implementation of the {IERC1820Implementer} interface.
 *
 * Contracts may inherit from this and call {_registerInterfaceForAddress} to
 * declare their willingness to be implementers.
 *
 * Any accounts requesting to add this to the registry will be approved.
 *
 * {IERC1820Registry-setInterfaceImplementer} should then be called for the
 * registration to be complete.
 */
contract ERC1820ImplementerAuthorizeAll {
    bytes32 private constant _ERC1820_ACCEPT_MAGIC = keccak256('ERC1820_ACCEPT_MAGIC');

    mapping(bytes32 => bool) private _supportedInterfaces;

    /**
     * @dev See {IERC1820Implementer-canImplementInterfaceForAddress}.
     */
    function canImplementInterfaceForAddress(
        bytes32 interfaceHash,
        address /*account*/
    ) public view virtual returns (bytes32) {
        return _supportedInterfaces[interfaceHash] ? _ERC1820_ACCEPT_MAGIC : bytes32(0x00);
    }

    /**
     * @dev Declares the contract as willing to be an implementer of
     * `interfaceHash` for `account`.
     *
     * See {IERC1820Registry-setInterfaceImplementer} and
     * {IERC1820Registry-interfaceHash}.
     */
    function _registerInterfaceForAddress(bytes32 interfaceHash) internal virtual {
        _supportedInterfaces[interfaceHash] = true;
    }
}
