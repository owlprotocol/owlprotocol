//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error ContractDisabled();

/**
 * Disabled contract. Useful for emergency upgrades that freeze the contract in its current state.
 */
contract FallbackRevert {
    fallback() external {
        revert ContractDisabled();
    }
}
