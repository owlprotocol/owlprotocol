// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ITokenURIConsumer {
    function uriProvider() external view returns (address);

    function setUriProvider(address _uriProvider) external;
}
