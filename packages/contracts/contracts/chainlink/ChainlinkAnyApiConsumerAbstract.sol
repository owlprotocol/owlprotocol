//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {ERC1820RegistryConsumer} from "../common/ERC1820/ERC1820RegistryConsumer.sol";
import {IChainlinkAnyApiConsumer} from "./IChainlinkAnyApiConsumer.sol";

error InvalidSelector(bytes4 selector);

abstract contract ChainlinkAnyApiConsumerAbstract is
    AccessControlUpgradeable,
    ERC1820RegistryConsumer,
    IChainlinkAnyApiConsumer
{
    bytes32 internal constant FULFILL_ROLE = keccak256("FULFILL_ROLE");

    function __ChainlinkAnyApiConsumer_init_unchained(address _fulfillRole) internal {
        _grantRole(FULFILL_ROLE, _fulfillRole);

        if (_registryExists()) {
            _registerInterface(type(IChainlinkAnyApiConsumer).interfaceId);
        }
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(AccessControlUpgradeable, ERC1820RegistryConsumer) returns (bool) {
        return ERC1820RegistryConsumer.supportsInterface(interfaceId);
    }
}
