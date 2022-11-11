//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * IRouterReceiver defines OpenGSN Interfaces
 */
interface IRouterReceiver {
    function isTrustedForwarder(address forwarder) external view returns (bool);
    function versionRecipient() external pure returns (string memory);
}
