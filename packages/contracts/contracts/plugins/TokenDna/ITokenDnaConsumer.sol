// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ITokenDnaConsumer {
    function getDna(uint256 tokenId) external view returns (bytes memory);

    function getDnaBatch(uint256[] memory tokenId) external view returns (bytes[] memory);

    function dnaProvider() external view returns (address);

    function setDnaProvider(address _dnaProvider) external;
}
