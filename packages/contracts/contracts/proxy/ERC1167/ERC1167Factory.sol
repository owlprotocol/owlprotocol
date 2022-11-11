// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ClonesUpgradeable} from '@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol';
import {Create2Upgradeable} from '@openzeppelin/contracts-upgradeable/utils/Create2Upgradeable.sol';
import {ContextUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol';
import {AddressUpgradeable} from '@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol';

import {IERC1167Factory} from './IERC1167Factory.sol';

error InvalidSender(address expected, address actual);

/**
 * @dev ERC1167 Minimal Proxy Factory
 */
contract ERC1167Factory is ContextUpgradeable, IERC1167Factory {
    using AddressUpgradeable for address;

    //https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
    uint256[50] private __gap;

    /**
     * @dev Compute salt based on optional initData & msgSender
     */
    function _salt(
        bytes32 salt,
        bytes memory initData,
        address msgSender
    ) internal pure returns (bytes32) {
        if (msgSender != address(0)) {
            if (initData.length > 0) {
                // salt recomputed based on msgSender & initData
                return keccak256(abi.encodePacked(salt, msgSender, initData));
            } else {
                // salt recomputed based on msgSender
                return keccak256(abi.encodePacked(salt, msgSender));
            }
        } else if (initData.length > 0) {
            // salt recomputed based on initData
            return keccak256(abi.encodePacked(salt, initData));
        }
        return salt;
    }

    /**
     * @inheritdoc IERC1167Factory
     */
    function deployDeterministic(
        bytes32 salt,
        bytes memory codeData,
        bytes memory initData,
        address msgSender
    ) external returns (address) {
        if (msgSender != address(0) && msgSender != _msgSender()) revert InvalidSender(msgSender, _msgSender());

        salt = _salt(salt, initData, msgSender);

        if (initData.length > 0) {
            //Deploy and initialize
            address contractAddress = Create2Upgradeable.deploy(0, salt, codeData);
            contractAddress.functionCall(initData, 'ERC1167Factory: Failed to call the contract');
            return contractAddress;
        } else {
            //Deploy
            return Create2Upgradeable.deploy(0, salt, codeData);
        }
    }

    /**
     * @inheritdoc IERC1167Factory
     */
    function deployDeterministicAddress(
        bytes32 salt,
        bytes memory codeData,
        bytes memory initData,
        address msgSender
    ) external view returns (address) {
        salt = _salt(salt, initData, msgSender);
        return Create2Upgradeable.computeAddress(salt, keccak256(codeData));
    }

    /**
     * @inheritdoc IERC1167Factory
     */
    function cloneDeterministic(
        address implementation,
        bytes32 salt,
        bytes memory initData,
        address msgSender
    ) external returns (address instance) {
        if (msgSender != address(0) && msgSender != _msgSender()) revert InvalidSender(msgSender, _msgSender());

        salt = _salt(salt, initData, msgSender);
        instance = ClonesUpgradeable.cloneDeterministic(implementation, salt);

        //data is optional
        if (initData.length > 0) instance.functionCall(initData, 'ERC1167Factory: Failed to call the proxy');
    }

    /**
     * @inheritdoc IERC1167Factory
     */
    function cloneDeterministicAddress(
        address implementation,
        bytes32 salt,
        bytes memory initData,
        address msgSender
    ) external view returns (address) {
        salt = _salt(salt, initData, msgSender);
        return ClonesUpgradeable.predictDeterministicAddress(implementation, salt);
    }
}
