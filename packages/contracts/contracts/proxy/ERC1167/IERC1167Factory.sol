// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @dev IERC1167 Minimal Proxy Factory
 */
interface IERC1167Factory {
    /**
     * @dev Deploy implementation contract, with optional initialization
     * @param salt CREATE2 salt
     * @param codeData CREATE2 contract bytecode
     * @param initData initialization data, used to re-compute salt if specified
     * @param msgSender added to salt if != address(0) to avoid other users to deploy clones on other chains
     */
    function deployDeterministic(
        bytes32 salt,
        bytes memory codeData,
        bytes memory initData,
        address msgSender
    ) external returns (address);

    /**
     * @dev Get deployed implementation contract address, with optional initialization
     * @param salt CREATE2 salt
     * @param codeData CREATE2 contract bytecode
     * @param initData initialization data, used to re-compute salt if specified
     * @param msgSender added to salt if != address(0) to avoid other users to deploy clones on other chains
     */
    function deployDeterministicAddress(
        bytes32 salt,
        bytes memory codeData,
        bytes memory initData,
        address msgSender
    ) external view returns (address);

    /**
     * @dev Clone implementation contract
     * @param implementation implementation contract to DELEGATECALL to,, used to compute salt
     * @param salt CREATE2 salt
     * @param initData initialization data, used to compute salt
     * @param msgSender added to salt if != address(0) to avoid other users to deploy clones on other chains
     */
    function cloneDeterministic(
        address implementation,
        bytes32 salt,
        bytes memory initData,
        address msgSender
    ) external returns (address instance);

    /**
     * @dev Get deployed clone contract address
     * @param implementation implementation contract to DELEGATECALL to,, used to compute salt
     * @param salt CREATE2 salt
     * @param initData initialization data, used to compute salt
     * @param msgSender added to salt if != address(0) to avoid other users to deploy clones on other chains
     */
    function cloneDeterministicAddress(
        address implementation,
        bytes32 salt,
        bytes memory initData,
        address msgSender
    ) external view returns (address);
}
