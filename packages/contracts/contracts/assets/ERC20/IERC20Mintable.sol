// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IERC20Mintable {
    /***** Minting *****/
    function mint(address to, uint256 amount) external;
}
