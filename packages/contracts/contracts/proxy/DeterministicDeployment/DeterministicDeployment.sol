// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract DeterministicDeployment {
    //fallback(uint256 salt, bytes calldata init_code) external;
    fallback() external {
        // deployed code
        assembly {
            calldatacopy(0, 32, sub(calldatasize(), 32))
            let result := create2(callvalue(), 0, sub(calldatasize(), 32), calldataload(0))
            if iszero(result) {
                revert(0, 0)
            }
            mstore(0, result)
            return(12, 20)
        }
    }
}
