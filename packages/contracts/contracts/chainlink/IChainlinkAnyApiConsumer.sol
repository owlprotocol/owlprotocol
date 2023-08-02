//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/**
 * @dev Interface for consumer of IChainlinkAnyApiClient.
 */
interface IChainlinkAnyApiConsumer {
    /**
     * @dev Fulfill function called by IChainlinkAnyApiClient. Developer is responsible for decoding data
     * Protected by onlyRole(FULFILL_ROLE) which maps trusted IChainlinkAnyApiClient
     * @param fulfillPrefixData that was submitted at request time
     * @param fulfillResponseData returned by Chainlink node
     */
    function fulfill(bytes calldata fulfillPrefixData, bytes calldata fulfillResponseData) external;
}
