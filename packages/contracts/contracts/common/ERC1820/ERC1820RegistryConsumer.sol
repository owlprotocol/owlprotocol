//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AddressUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import {IERC1820RegistryUpgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC1820RegistryUpgradeable.sol";
import {IERC165Upgradeable} from "@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol";

contract ERC1820RegistryConsumer is IERC165Upgradeable {
    using AddressUpgradeable for address;

    mapping(bytes32 => bool) private _supportedInterfaces;

    //address internal constant ERC1820_REGISTRY = 0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24;
    //EIP1820 is not deployable on networks that enfore EIP-150 at consensus-level
    //Instead, we use the same implementation, but deployed using our universal ERC1176ProxyFactory
    //that lives on the same address across networks and deploys contracts using CREATE2
    address internal constant ERC1820_REGISTRY = 0x90995B03B0F579e9B69E5f1F06059Ac57a2C46eA;
    bytes32 internal constant ONE = 0x00000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;

    IERC1820RegistryUpgradeable internal constant registry = IERC1820RegistryUpgradeable(ERC1820_REGISTRY);

    function _registryExists() internal view returns (bool) {
        return ERC1820_REGISTRY.isContract();
    }

    function _registerInterface(bytes4 interfaceId) internal {
        _supportedInterfaces[interfaceId] = true;
        registry.updateERC165Cache(address(this), interfaceId);
        registry.setInterfaceImplementer(address(this), interfaceId | ONE, address(this));
    }

    /**
     * @inheritdoc IERC165Upgradeable
     */
    function supportsInterface(bytes4 interfaceId) public view virtual returns (bool) {
        return _supportedInterfaces[interfaceId];
    }
}
