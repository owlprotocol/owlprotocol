//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @dev IContractURI defines a contract with metadata. A 1:1 relationship between contract address and metdata uri.
 */
interface IContractURI {
    function contractURI() external view returns (string memory);
    function setContractURI(string memory uri) external;
}
